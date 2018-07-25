import { Component, IComponent } from '../../../core/pipeline/index';

import { ItemTemplate } from '../../../income/index';
import { Util } from '../../../util/index';
import { Item } from '../../../outcome/item/index';

@Component({
    pipeline: 'item'
})
export class Type implements IComponent {
    /**
     * Parses the item type of the item
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        item.type = Util.SnakeCase2Identifyable(rawItem.itemSettings.itemType.replace('ITEM_TYPE_', ''));
        return item;
    }
}
