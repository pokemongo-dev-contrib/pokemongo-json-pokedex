import chalk from 'chalk';

import APP_SETTINGS from '@settings/app';
import { PokemonPipeline } from './processing/pokemon';
import * as fs from 'fs';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');

console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);

fs.writeFile('./output/pokemon.json', JSON.stringify(new PokemonPipeline(gameMaster).Run(), null, 4), () => { });