import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Family implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.family = {
      id: rawPokemon.pokemonSettings.familyId,
      name: Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.familyId.replace('FAMILY_', ''))
    };
    return pokemon;
  }
}