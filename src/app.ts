import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import APP_SETTINGS from '@settings/app';
import { PokemonWriter } from '@components/pokemon/pokemon.writer';
import { MoveWriter } from '@components/move/move.writer';
import { AvatarCustomizationWriter } from '@components/avatar-customization/avatar-customization.writer';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');


console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);

new PokemonWriter().Write().then(() => {
    console.log(`${chalk.green('✓')} Pokemon written to ${chalk.cyan(APP_SETTINGS.POKEMON_FILE)}`);
}, (err) => {
    console.log(`${chalk.red('×')} Failed at parsing Pokemon`);
    console.log(err);
});

new MoveWriter().Write().then(() => {
    console.log(`${chalk.green('✓')} Moves written to ${chalk.cyan(APP_SETTINGS.MOVE_FILE)}`);
}, (err) => {
    console.log(`${chalk.red('×')} Failed at parsing Moves`);
    console.log(err);
});

new AvatarCustomizationWriter().Write().then(() => {
    console.log(`${chalk.green('✓')} AvatarCostumization written to ${chalk.cyan(APP_SETTINGS.AVATAR_CUSTOMIZATION_FILE)}`);
}, (err) => {
    console.log(`${chalk.red('×')} Failed at parsing AvatarCostumization`);
    console.log(err);
});