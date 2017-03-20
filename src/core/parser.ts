import { RootObject } from './game_master';

interface Parser {
    Parse(gameMaster: RootObject);
}

export { Parser };