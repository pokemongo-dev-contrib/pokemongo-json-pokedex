import { Type } from './type.model';
import { ItemTemplate } from '@core/game_master/gameMaster';
import { Util } from '@util';

export class TypeMapper {
    public static Map(rawType: ItemTemplate, typeIds: Map<number, string>): Type {
        let type: Type = new Type();

        type.id = rawType.templateId
        type.name = Util.SnakeCase2HumanReadable(rawType.templateId.replace('POKEMON_TYPE_', ''));

        type.damage = rawType.typeEffective.attackScalar.reduce((d, t, m) => {
          d[typeIds.get(m)] = t
          return d
        }, Object.create(null))

        return type
    }
}
