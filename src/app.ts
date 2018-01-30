import * as fs from 'fs';

import APP_SETTINGS from '@settings/app';
import { PokemonPipeline } from './processing/pokemon';
import { TypePipeline } from './processing/type';
import chalk from 'chalk';

const gameMaster = require('./data/GAME_MASTER.json');
const packageJson = require('../package.json');

console.log(`${chalk.blue('i')} ${packageJson.name} ${chalk.cyan(packageJson.version)} `);
console.log(`${chalk.blue('i')} Using GAME_MASTER version ${chalk.cyan(gameMaster.version)}`);

fs.writeFile('./output/pokemon.json', JSON.stringify(new PokemonPipeline(gameMaster).Run(), null, 4), () => { });
fs.writeFile('./output/type.json', JSON.stringify(new TypePipeline(gameMaster).Run(), null, 4), () => { });