import { Component, IComponent } from '@core/pipeline/index';

import { Item } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';
import { Util } from '@util';
import { InventoryUpgrade } from './inventoryUpgrade';

@Component({
    pipeline: 'item',
    dependencies: [
        new InventoryUpgrade()
    ]
})
export class Type implements IComponent {
    /**
     * The type of an inventoryUpgrade
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        if (!rawItem.itemSettings.inventoryUpgrade) {
            return item;
        }

        const inventoryUpgrade = rawItem.itemSettings.inventoryUpgrade;
        item.inventoryUpgrade.type = Util.SnakeCase2Identifyable(inventoryUpgrade.upgradeType);

        return item;
    }
}
