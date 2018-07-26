import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemStardustBoost } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';

@Component({
    pipeline: 'item'
})
export class StardustBoost implements IComponent {
    /**
     * Sets the stardust boost object and maps generic properties
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is a stardustBoost
        if (!rawItem.itemSettings.stardustBoost) {
            return item;
        }

        item.stardustBoost = item.stardustBoost || {} as ItemStardustBoost;
        item.stardustBoost.stardustMultiplier = rawItem.itemSettings.stardustBoost.stardustMultiplier;
        item.stardustBoost.boostDurationMs = rawItem.itemSettings.stardustBoost.boostDurationMs;

        return item;
    }
}
