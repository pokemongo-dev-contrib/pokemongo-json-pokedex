import * as fs from 'fs';

import APP_SETTINGS from '@settings/app';
import { AvatarCustomizationPipeline } from './processing/avatarCustomization';
import { MovePipeline } from './processing/move';
import { Pipeline } from '@core';
import { PokemonPipeline } from './processing/pokemon';
import { TypePipeline } from './processing/type';
import chalk from 'chalk';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');

const done = (err, name) =>
    err ?
        (console.log(`${chalk.red('✘')} Error while writing ${name}:`) || console.error(err)) :
        console.log(`${chalk.green('✔')} Successfully written ${name}`);

const write = (file: string, pipeline: Pipeline, name: string) =>
    fs.writeFile(file, JSON.stringify(pipeline.Run(), null, 4), err => done(err, name));

console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);

write('./output/pokemon.json', new PokemonPipeline(gameMaster), 'Pokemons');
write('./output/type.json', new TypePipeline(gameMaster), 'Types');
write('./output/avatar-customization.json', new AvatarCustomizationPipeline(gameMaster), 'Avatar Customizations');
write('./output/move.json', new MovePipeline(gameMaster), 'Moves');