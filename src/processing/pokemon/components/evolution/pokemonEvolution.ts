import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { ItemTemplate } from '@income';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.SIMPLE_MAP
})
export class PokemonEvolutionParser implements IComponent {
    Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
        // Ensure Pokemon Evolution is set
        pokemon.evolution = pokemon.evolution || {} as PokemonEvolution;
        return pokemon;
    }
}