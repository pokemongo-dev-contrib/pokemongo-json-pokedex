import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { ItemTemplate } from '@income';
import { PokemonEvolutionParser } from './pokemonEvolution';
import { Util } from '@util';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.ADVANCED_MAP,
    dependencies: [
        new PokemonEvolutionParser()
    ]
})
export class PastBranches implements IComponent {
    Process(pokemons: Pokemon[], rawPokemon: ItemTemplate[]): Pokemon[] {
        console.log(pokemons);
        return pokemons;
    }
}