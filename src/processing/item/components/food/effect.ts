import { Component, IComponent } from '@core/pipeline/index';

import { Item, ItemEffect } from '@outcome/item/index';
import { ItemTemplate } from '@income/index';
import { Util } from '@util/util';

@Component({
  pipeline: 'item'
})
export class Effect implements IComponent {
  /**
   * Parses the item effect
   */
  Process(item: Item, rawItem: ItemTemplate): Item {
    // Is a food
    if (!rawItem.itemSettings.food) {
      return item;
    }

    const effects = rawItem.itemSettings.food.itemEffect;
    const effectPercents = rawItem.itemSettings.food.itemEffectPercent;

    item.effect = effects.map((effect: string, index: number): ItemEffect => {
      return {
        ...Util.SnakeCase2Identifyable(effect.replace('ITEM_EFFECT_', '')),
        effectPercent: effectPercents[index]
      }
    });

    return item;
  }
}
