import { Type } from './type.model';
import { ItemTemplate } from '@core/game_master/gameMaster';
import { Util } from '@util';
import APP_SETTINGS from '@settings/app';

export class TypeMapper {
    public static Map(rawType: ItemTemplate): Type {
        let type: Type = new Type();

        type.id = rawType.templateId;
        type.name = Util.SnakeCase2HumanReadable(rawType.templateId.replace('POKEMON_TYPE_', ''));

        type.damage = APP_SETTINGS.POKEMON_TYPES.map((pokemonType, index) => ({
            id: pokemonType.id,
            attackScalar: rawType.typeEffective.attackScalar[pokemonType.attackScalarIndex]
        }));

        return type;
    }
}
