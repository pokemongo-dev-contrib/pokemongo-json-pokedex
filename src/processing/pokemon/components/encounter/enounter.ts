import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class Encounter implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.encounter = {
      attackProbability: rawPokemon.pokemonSettings.encounter.attackProbability,
      attackTimer: rawPokemon.pokemonSettings.encounter.attackTimerS,
      baseFleeRate: rawPokemon.pokemonSettings.encounter.baseFleeRate,
      baseCaptureRate: rawPokemon.pokemonSettings.encounter.baseCaptureRate,
      cameraDistance: rawPokemon.pokemonSettings.encounter.cameraDistance,
      collisionRadius: rawPokemon.pokemonSettings.encounter.collisionRadiusM,
      dodgeDistance: rawPokemon.pokemonSettings.encounter.dodgeDistance,
      dodgeProbability: rawPokemon.pokemonSettings.encounter.dodgeProbability,
      jumpTime: rawPokemon.pokemonSettings.encounter.jumpTimeS,
      maxPokemonActionFrequency: rawPokemon.pokemonSettings.encounter.maxPokemonActionFrequencyS,
      minPokemonActionFrequency: rawPokemon.pokemonSettings.encounter.minPokemonActionFrequencyS,
      movementType:
        rawPokemon.pokemonSettings.encounter.movementType ? Util.SnakeCase2Identifyable(rawPokemon.pokemonSettings.encounter.movementType) : null,
    };

    return pokemon;
  }
}