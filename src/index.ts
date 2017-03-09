import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import { GameMaster } from 'core/game_master';
import { PokemonParser } from './components/pokemon/pokemon.parser';

const gameMaster = require('./data/GAME_MASTER.json');

const OUTPUT_PATH = 'output';
const POKEMON_PATH = path.join(OUTPUT_PATH, 'pokemon.json')

fs.writeFile(POKEMON_PATH, JSON.stringify(new PokemonParser(gameMaster).parse()), function (err) {
    if (err) {
        console.log(chalk.red('×') + ' Failed at Parsing Pokemon')
        return console.log(err);
    }

    console.log(chalk.green('✓') + ' Pokemon written to ' + POKEMON_PATH);   
});