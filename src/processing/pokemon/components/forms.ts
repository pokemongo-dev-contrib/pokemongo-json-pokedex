import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';
import * as leftPad from 'left-pad';
import { PokemonForm } from '@outcome/pokemon/pokemonForm';

const gameMaster = require('@data/GAME_MASTER.json');

/**
 * Parses the pokemon forms from the item templates for each pokemon
 */
@Component({
    pipeline: 'pokemon'
})
export class Forms implements IComponent {

    /**
     * Sets any additional forms the pokemon may have
     */
    Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {

        const forms = this.getForms(gameMaster, rawPokemon);

        pokemon.forms = forms;

        return pokemon;
    }

    private getForms(gameMaster, rawPokemon: ItemTemplate) {

        const dex = parseInt(rawPokemon.templateId.split('_')[0].slice(1), 10);
        const dexString = leftPad(dex, 4, '0');

        const formKey = `FORMS_V${dexString}_POKEMON_${rawPokemon.pokemonSettings.pokemonId}`;

        const itemTemplate = gameMaster
            .itemTemplates
            .find(itemTemplate => {
                return itemTemplate.templateId === formKey;
            });

        const forms: PokemonForm[] = [];

        if (itemTemplate && itemTemplate.formSettings && itemTemplate.formSettings.forms) {

            itemTemplate.formSettings.forms.forEach(f => {

                const formName = this.removeSuffixIfNeeded(f.form);

                forms.push({
                    id: formName,
                    name: Util.SnakeCase2HumanReadable(formName)
                });
            });
        }

        return forms;
    }

    private removeSuffixIfNeeded(name: string): string {

        const normalSuffix: string = '_NORMAL';

        const normalIndex = name.indexOf(normalSuffix);

        if (normalIndex >= 0) {
            name = name.substring(0, normalIndex);
        }

        return name;
    }
}