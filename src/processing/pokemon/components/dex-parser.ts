import { Component, IComponent} from '@core';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';

/**
 * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
 */
@Component({
    type: 'pokemon'
})
export class DexParser implements IComponent {
    /**
     * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
     * @param {String} id The templateId to parse
     */
    Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
       pokemon.dex = parseInt(rawPokemon.templateId.split('_')[0].slice(1), 10);
       return pokemon;
    }
}