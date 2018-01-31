import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Type } from '@outcome/type';

@Component({
  pipeline: 'type'
})
export class Id implements IComponent {
  Process(type: Type, rawType: ItemTemplate): Type {
    type.id = rawType.templateId;
    return type;
  }
}