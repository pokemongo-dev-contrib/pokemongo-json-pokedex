import { Component, IComponent } from '@core/pipeline/component';
import { Pokemon } from '@outcome/pokemon';
import { Name } from '../name';

@Component({
    pipeline: 'pokemon',
    templateId: 'V0122_POKEMON_MR_MIME',
    dependencies: [
        new Name()
    ]
})
export class MrMime implements IComponent {
    Process(pokemon: Pokemon): Pokemon {
        pokemon.name = 'Mr. Mime';
        return pokemon;
    }
}
