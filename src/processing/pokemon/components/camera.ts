
import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Types implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.camera = {
      cylinderGround: rawPokemon.pokemonSettings.camera.cylinderGroundM,
      cylinderRadius: rawPokemon.pokemonSettings.camera.cylinderRadiusM,
      diskRadius: rawPokemon.pokemonSettings.camera.diskRadiusM,
      shoulderModeScale: rawPokemon.pokemonSettings.camera.shoulderModeScale
    };

    return pokemon;
  }
}