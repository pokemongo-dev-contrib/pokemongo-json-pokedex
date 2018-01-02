import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Stats implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.stats = {
      baseAttack: rawPokemon.pokemonSettings.stats.baseAttack,
      baseDefense: rawPokemon.pokemonSettings.stats.baseDefense,
      baseStamina: rawPokemon.pokemonSettings.stats.baseStamina
    };
    return pokemon;
  }
}