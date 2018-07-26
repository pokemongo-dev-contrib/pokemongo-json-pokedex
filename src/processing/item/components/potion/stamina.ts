import { Component, IComponent } from '@core/pipeline/index';

import { Item } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';
import { Potion } from './potion';

@Component({
    pipeline: 'item',
    dependencies: [
        new Potion()
    ]
})
export class StaminaAmount implements IComponent {
    /**
     * Stamina amount
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is a potion
        if (!rawItem.itemSettings.potion) {
            return item;
        }

        item.potion.staminaAmount = rawItem.itemSettings.potion.staAmount;
        item.potion.staminaPercent = rawItem.itemSettings.potion.staPercent;

        return item;
    }
}
