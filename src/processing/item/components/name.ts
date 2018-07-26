import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Util } from '@util';
import { Item } from '@outcome/item';

@Component({
  pipeline: 'item'
})
export class Name implements IComponent {
  /**
   * Parses the english name of the item
   */
  Process(item: Item, rawItem: ItemTemplate): Item {
    item.name = Util.SnakeCase2HumanReadable(rawItem.templateId.replace('ITEM_', ''));
    return item;
  }
}
