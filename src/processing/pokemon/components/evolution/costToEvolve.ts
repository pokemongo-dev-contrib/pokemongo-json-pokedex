import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { ItemTemplate } from '@income';
import { PastBranches } from './pastBranches';
import { PokemonEvolutionParser } from 'src/processing/pokemon/components/evolution/pokemonEvolution';
import { Util } from '@util';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.ADVANCED_MAP,
    dependencies: [
        new PokemonEvolutionParser(),
        new PastBranches()
    ]
})
export class CostToEvolve implements IComponent {
    Process(pokemons: Pokemon[], rawPokemon: ItemTemplate[]): Pokemon[] {
        return pokemons;
    }
}