import { ItemTemplate } from '../../../../income/index';

/**
 * Converts the item template id to the item id
 * @param templateId The template id of the item
 */
export const GetId = (rawPokemon: ItemTemplate) => {
    let newId = rawPokemon.templateId.replace('ITEM_', '');
    return newId;
};
