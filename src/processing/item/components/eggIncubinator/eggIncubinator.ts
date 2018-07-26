import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemEggIncubinator } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';

@Component({
    pipeline: 'item'
})
export class EggIncubinator implements IComponent {
    /**
     * Sets the egg incubator object and maps generic properties
     */
    Process(item: Item, rawItem: ItemTemplate): Item {
        // Is an egg incubator
        if (!rawItem.itemSettings.eggIncubator) {
            return item;
        }

        item.eggIncubinator = item.eggIncubinator || {} as ItemEggIncubinator;
        item.eggIncubinator.uses = rawItem.itemSettings.eggIncubator.uses;
        item.eggIncubinator.distanceMultiplier = rawItem.itemSettings.eggIncubator.distanceMultiplier;

        return item;
    }
}
