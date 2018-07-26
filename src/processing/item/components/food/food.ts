import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemFood } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';

@Component({
    pipeline: 'item'
})
export class Food implements IComponent {
    /**
     * Sets the food object
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is a food
        if (!rawItem.itemSettings.food) {
            return item;
        }

        item.food = item.food || {} as ItemFood;
        item.food.berryMultiplier = rawItem.itemSettings.food.berryMultiplier;

        return item;
    }
}
