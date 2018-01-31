import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Type } from '@outcome/type';
import { Util } from '@util';

@Component({
  pipeline: 'type'
})
export class Name implements IComponent {
  Process(type: Type, rawType: ItemTemplate): Type {
    type.name = Util.SnakeCase2HumanReadable(rawType.templateId.replace('POKEMON_TYPE_', ''));
    return type;
  }
}