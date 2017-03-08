import { GameMaster } from 'core/game_master';
import { Parser } from 'core/parser';

class PokemonParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g');

    constructor(private gameMaster: GameMaster) { }

    parse() {
        this.gameMaster
            .itemTemplates
            .filter(item => this.regexp.test(item.templateId))
            .forEach(pokemon => {
                console.log(pokemon);
            });
    }
}

export { PokemonParser };