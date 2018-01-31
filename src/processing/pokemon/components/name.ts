import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Name implements IComponent {
  /**
   * Parses the english name of the Pokemon (eg: "BULBASAUR" => "Bulbasaur")
   */
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.name = Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.pokemonId);
    return pokemon;
  }
}