import { Component, IComponent } from '@core/pipeline/component';
import { Pokemon } from '@outcome/pokemon';
import { Name } from '../name';

@Component({
    pipeline: 'pokemon',
    templateId: 'V0250_POKEMON_HO_OH',
    dependencies: [
        new Name()
    ]
})
export class HoOh implements IComponent {
    Process(pokemon: Pokemon): Pokemon {
        pokemon.name = 'Ho-Oh';
        return pokemon;
    }
}
