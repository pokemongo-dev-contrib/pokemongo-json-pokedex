import { ItemTemplate } from '@income/index';

/**
 * Converts the pokemon template id to the pokemon id
 * @param templateId The template id of the item
 */
export const TemplateIdToId = (rawPokemon: ItemTemplate) => {
    let newId = rawPokemon.templateId.substring(14);
    const pokemonId = rawPokemon.pokemonSettings.pokemonId;
    if (pokemonId.endsWith('_MALE')) {
        newId += '_MALE'
    }
    if (pokemonId.endsWith('_FEMALE')) {
        newId += '_FEMALE';
    }
    return newId;
};
