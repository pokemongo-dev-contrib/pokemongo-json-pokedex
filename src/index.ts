import * as fs from 'fs';
import { GameMaster } from 'core/game_master';
import { PokemonParser } from './components/pokemon';

let gameMasterContent = fs.readFile('./src/data/GAME_MASTER.json', 'utf8', function (err, data) {
    console.log(data);
    let gameMaster: GameMaster = JSON.parse(data);
    new PokemonParser(gameMaster).parse();
});