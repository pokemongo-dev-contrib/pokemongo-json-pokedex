import { Component, IComponent } from '@core';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  type: 'pokemon'
})
export class NameParser implements IComponent {
  /**
   * Parses the english name of the Pokemon (eg: "BULBASAUR" => "Bulbasaur")
   */
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.name = Util.SnakeCase2HumanReadable(rawPokemon.pokemonSettings.pokemonId);
    return pokemon;
  }
}