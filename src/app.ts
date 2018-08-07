import * as fs from 'fs-promise';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { forEachSeries, forEach } from 'p-iteration';

import { AvatarCustomizationPipeline } from './processing/avatarCustomization/index';
import { MovePipeline } from './processing/move/index';
import { Pipeline, IPipeline } from './core/index';
import { PokemonPipeline } from './processing/pokemon/index';
import { TypePipeline } from './processing/type/index';
import chalk from 'chalk';
import { ItemPipeline } from './processing/item';
import { PokemonLocalesPipeline } from './processing/pokemon/locales/pokemonLocalesPipeline';
import { Locale } from './outcome/locales/locale.interface';
import { PokemonLocalTranslations } from './outcome/pokemon/index';
import { pathExists, mkdir } from 'fs-promise';
import { MoveLocalesPipeline } from './processing/move/locales/moveLocalesPipeline';
import { LocalesPipeline } from './core/pipeline/localePipeline';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');
const POKEMON_TRANSLATIONS = require('./data/POKEMON_TRANSLATIONS.json');
const MOVES_TRANSLATIONS = require('./data/MOVES_TRANSLATIONS.json');

const LOCALES = ['de-DE', 'en-US', 'zh-TW', 'fr-FR', 'es-ES', 'ja-JP', 'it-IT', 'ko-KR', 'pt-BR'];

const done = (err, name) =>
    err ?
        (console.log(`${chalk.red('✘')} Error while writing ${name}:`) || console.error(err)) :
        console.log(`${chalk.green('✔')} Successfully written ${name}`);

const write = async (file: string, pipeline: Pipeline, name: string) => {
    let data;
    try {
        data = await pipeline.Run();
    }
    catch (err) {
        done(err, name);
    }
    fs.writeFile(file, JSON.stringify(data, null, 4), err => done(err, name));
    return data;
}

const writeTranslations = async (file: string, pipeline: LocalesPipeline<any, any>, name: string) => {
    let translations: Locale<PokemonLocalTranslations>[];
    try {
        translations = await pipeline.Run();
    }
    catch (err) {
        done(err, name);
    }

    forEachSeries(translations, async translation => {
        const folder = `./output/locales/${translation.name}`;
        // @ts-ignore
        const folderExists = await fs.exists(folder);
        if (!folderExists) {
            mkdirp.sync(folder);
        }
        await fs.writeFile(path.join(folder, file), JSON.stringify(translation.data, null, 4));
        done(null, `${name} ${translation.name}`)
    });
};

console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);


const writePokemon = async () => {
    const pokemons = await write('./output/pokemon.json', new PokemonPipeline(gameMaster), 'Pokemons');
    writeTranslations('pokemon.json', await new PokemonLocalesPipeline(POKEMON_TRANSLATIONS, pokemons, LOCALES), 'Pokemon Translations');
}

const writeMoves = async () => {
    const moves = await write('./output/move.json', new MovePipeline(gameMaster), 'Moves');
    writeTranslations('move.json', new MoveLocalesPipeline(MOVES_TRANSLATIONS, moves, LOCALES), 'Moves Translations');
}

writePokemon();
writeMoves();

write('./output/type.json', new TypePipeline(gameMaster), 'Types');
write('./output/avatar-customization.json', new AvatarCustomizationPipeline(gameMaster), 'Avatar Customizations');
write('./output/item.json', new ItemPipeline(gameMaster), 'Items');
