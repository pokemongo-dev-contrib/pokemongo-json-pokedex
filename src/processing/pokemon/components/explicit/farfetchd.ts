import { Component, IComponent } from '@core/pipeline/component';
import { Pokemon } from '@outcome/pokemon';
import { Name } from '../name';

@Component({
    pipeline: 'pokemon',
    templateId: 'V0083_POKEMON_FARFETCHD',
    dependencies: [
        new Name()
    ]
})
export class Farfetchd implements IComponent {
    Process(pokemon: Pokemon): Pokemon {
        pokemon.name = 'Farfetch\'d';
        return pokemon;
    }
}
