import { Component, IComponent } from '@core/pipeline';

import { Item } from '@outcome/item';
import { ItemTemplate } from '@income/index';

@Component({
  pipeline: 'item'
})
export class GenericPropertyMapper implements IComponent {
  /**
   * Maps generic properties with the item
   */
  Process(item: Item, rawItem: ItemTemplate): Item {
    item.dropTrainerLevel = rawItem.itemSettings.dropTrainerLevel;
    return item;
  }
}
