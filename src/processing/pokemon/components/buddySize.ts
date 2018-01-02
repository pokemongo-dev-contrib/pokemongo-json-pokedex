import { Component, IComponent } from '@core/pipeline/component';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class BuddySize implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    if (rawPokemon.pokemonSettings.buddySize) {
      pokemon.buddySize = {
        id: rawPokemon.pokemonSettings.buddySize,
        name: Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.buddySize.replace('BUDDY_', ''))
      }
    }
    return pokemon;
  }
}