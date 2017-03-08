import { GameMaster } from 'core/game_master';
import { Parser } from 'core/parser';
import { Pokemon } from './';

class PokemonParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g');
    private pokemons: Pokemon[];
    constructor(private gameMaster: GameMaster) { }

    private addPokemonToList(rawPokemon: any) {
        let pokemon: Pokemon = new Pokemon();
        pokemon.animationTime = rawPokemon
    }

    public parse() {
        this.gameMaster
            .itemTemplates
            .filter(item => this.regexp.test(item.templateId))
            .forEach(this.addPokemonToList);
    }
}

export { PokemonParser };