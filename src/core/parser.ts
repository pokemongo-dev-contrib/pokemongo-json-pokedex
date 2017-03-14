import { GameMaster } from './game_master';

interface Parser {
    Parse(gameMaster: GameMaster);
}

export { Parser };