import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import APP_SETTINGS from './app.settings';
import { PokemonWriter } from './components/pokemon/pokemon.writer';
import { GameMaster } from './core/game_master';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');


console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);

new PokemonWriter().Write().then(() => {
    console.log(`${chalk.green('✓')} Pokemon written to ${chalk.cyan(APP_SETTINGS.POKEMON_FILE)}`);
}, () => {
    console.log(`${chalk.red('×')} Failed at Parsing Pokemon`);
});