import { Component, IComponent } from '../../../core/pipeline/index';

import { Item } from '../../../outcome/item/index';
import { ItemTemplate } from '../../../income/index';
import { GetId } from './shared/getId';

@Component({
  pipeline: 'item'
})
export class GenericPropertyMapper implements IComponent {
  /**
   * Maps generic properties with the item
   */
  Process(item: Item, rawItem: ItemTemplate): Item {
    item.id = GetId(rawItem);
    return item;
  }
}
