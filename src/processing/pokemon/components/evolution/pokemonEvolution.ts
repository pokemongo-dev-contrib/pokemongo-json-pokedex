import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { ItemTemplate } from '@income';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.SIMPLE_MAP
})
/**
 * Ensures if `pokemon.evolution` is set.
 */
export class PokemonEvolutionParser implements IComponent {
    Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
        pokemon.evolution = pokemon.evolution || {} as PokemonEvolution;
        return pokemon;
    }
}