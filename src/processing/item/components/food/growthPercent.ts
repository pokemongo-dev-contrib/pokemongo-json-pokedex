import { Component, IComponent } from '@core/pipeline/index';

import { Item } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';
import { Food } from './food';

@Component({
    pipeline: 'item',
    dependencies: [
        new Food()
    ]
})
export class GrowthPercent implements IComponent {
    /**
     * Parses the growth percent
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is a food
        if (!rawItem.itemSettings.food) {
            return item;
        }

        item.food.growthPercent = rawItem.itemSettings.food.growthPercent;

        return item;
    }
}
