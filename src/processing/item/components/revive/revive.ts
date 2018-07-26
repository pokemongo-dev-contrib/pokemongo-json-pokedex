import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemRevive } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';

@Component({
    pipeline: 'item'
})
export class Revive implements IComponent {
    /**
     * Sets the revive object and maps generic properties
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is a revie
        if (!rawItem.itemSettings.revive) {
            return item;
        }

        item.revive = item.revive || {} as ItemRevive;
        item.revive.staminaPercent = rawItem.itemSettings.revive.staPercent;
        return item;
    }
}
