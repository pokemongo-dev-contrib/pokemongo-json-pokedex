
import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Rarity implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    if (rawPokemon.pokemonSettings.rarity) {
      pokemon.rarity = {
        id: rawPokemon.pokemonSettings.rarity,
        name: Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.rarity
          .replace('POKEMON_RARITY_', ''))
      };
    }
    return pokemon;
  }
}