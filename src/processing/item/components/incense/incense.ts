import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemFood, ItemIncense } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';

@Component({
    pipeline: 'item'
})
export class Incense implements IComponent {
    /**
     * Sets the incense object and maps generic properties
     */
    Process(item: Item, rawItem: ItemTemplate): Item {

        const incense = rawItem.itemSettings.incense;

        // Is an incense
        if (!incense) {
            return item;
        }

        item.incense = item.incense || {} as ItemIncense;
        item.incense.distanceRequiredForShorterIntervalMeters = incense.distanceRequiredForShorterIntervalMeters;
        item.incense.incenseLifeTimeSceonds = incense.incenseLifetimeSeconds;
        item.incense.movingTimeBetweenEncounterSeconds = incense.movingTimeBetweenEncounterSeconds;
        item.incense.standingTimeBetweenEncountersSeconds = incense.standingTimeBetweenEncountersSeconds;

        return item;
    }
}
