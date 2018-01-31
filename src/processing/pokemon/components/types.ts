
import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Types implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.types = [];

    if (rawPokemon.pokemonSettings.type) {
      pokemon.types.push({
        id: rawPokemon.pokemonSettings.type,
        name: Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.type
          .replace('POKEMON_TYPE_', ''))
      });
    }

    if (rawPokemon.pokemonSettings.type2) {
      pokemon.types.push({
        id: rawPokemon.pokemonSettings.type2,
        name: Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.type2.replace('POKEMON_TYPE_', ''))
      });
    }

    return pokemon;
  }
}