import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { TemplateIdToId } from './shared/templateIdToId';

@Component({
    pipeline: 'pokemon'
})
export class Id implements IComponent {
    /**
     * Sets the id of the pokemon from the templateId
     */
    Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
        pokemon.id = TemplateIdToId(rawPokemon);
        return pokemon;
    }
}
