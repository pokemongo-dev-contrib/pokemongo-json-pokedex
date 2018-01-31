import { Component, IComponent } from '@core/pipeline';

import APP_SETTINGS from '@settings/app';
import { ItemTemplate } from '@income';
import { Type } from '@outcome/type';
import { Util } from '@util';

@Component({
  pipeline: 'type',
})
export class Damage implements IComponent {
  Process(type: Type, rawType: ItemTemplate): Type {
    type.damage = APP_SETTINGS.POKEMON_TYPES.map((pokemonType, index) => ({
        id: pokemonType.id,
        attackScalar: rawType.typeEffective.attackScalar[pokemonType.attackScalarIndex]
    }));
    return type;
  }
}