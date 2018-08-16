import { Component, IComponent } from '@core/pipeline/component';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class BuddySize implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    const buddySize = rawPokemon.pokemonSettings.buddySize || 'BUDDY_MEDIUM';

    pokemon.buddySize = {
      id: buddySize,
      name: Util.SnakeCase2HumanReadable(buddySize.replace('BUDDY_', ''))
    }

    return pokemon;
  }
}