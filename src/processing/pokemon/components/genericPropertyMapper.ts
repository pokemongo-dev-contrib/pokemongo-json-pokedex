import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';

@Component({
  pipeline: 'pokemon'
})
export class GenericPropertyMapper implements IComponent {
  /**
   * Maps generic properties which do not need to be processed.
   */
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.animationTime = rawPokemon.pokemonSettings.animationTime;
    pokemon.height = rawPokemon.pokemonSettings.pokedexHeightM;
    pokemon.modelHeight = rawPokemon.pokemonSettings.modelHeight;
    pokemon.kmBuddyDistance = rawPokemon.pokemonSettings.kmBuddyDistance;
    pokemon.weight = rawPokemon.pokemonSettings.pokedexWeightKg;
    pokemon.modelScale = rawPokemon.pokemonSettings.modelScale;
    pokemon.id = rawPokemon.pokemonSettings.pokemonId;

    return pokemon;
  }
}