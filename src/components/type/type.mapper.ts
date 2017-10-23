import { Type } from './type.model';
import { ItemTemplate } from '@core/game_master/gameMaster';
import { Util } from '@util';

export class TypeMapper {
    public static Map(rawType: ItemTemplate, typeIds: Map<number, string>): Type {
        let type: Type = new Type();

        type.id = rawType.templateId
        type.name = Util.SnakeCase2HumanReadable(rawType.templateId.replace('POKEMON_TYPE_', ''));

        type.damage = [];
        for (let i = 0; i < rawType.typeEffective.attackScalar.length; i++) {
            type.damage.push({
                id: typeIds.get(i),
                attackScalar: rawType.typeEffective.attackScalar[i]
            });
        }

        return type
    }
}
