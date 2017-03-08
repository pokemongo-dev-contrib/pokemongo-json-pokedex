import { GameMaster } from './game_master';

interface Parser {
    parse(gameMaster: GameMaster);
}

export { Parser };