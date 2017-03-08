import { Pokemon } from './pokemon.model';

class PokemonMapper {
    public static Map(rawPokemon: any): Pokemon{
        let pokemon: Pokemon = new Pokemon();
        let pkmStngs: any = rawPokemon.pokemonSettings;
        pokemon.name = pkmStngs.pokemonId;
        pokemon.modelScale = pkmStngs.modelScale;
        return pokemon;
    }
}