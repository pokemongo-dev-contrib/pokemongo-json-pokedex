import { Parser, RootObject, ItemTemplate } from '@core';
import { Type, TypeMapper } from './';

class TypeParser implements Parser {
    private readonly pokemonTypeRegex: string = '^POKEMON_TYPE_.*$';
    private isItemTemplatePokemonType(item: ItemTemplate): boolean {
        return new RegExp(this.pokemonTypeRegex, 'g').test(item.templateId);
    }

    public Parse(gameMaster: RootObject): Type[] {
        let types = gameMaster
            .itemTemplates
            .filter(p => this.isItemTemplatePokemonType(p));

        let typeIds = types.reduce((m, k, v) => {
          m.set(v, k.typeEffective.attackType)
          return m
        }, new Map<number, string>())

        return types.map(p => TypeMapper.Map(p, typeIds));
    }
}

export { TypeParser };
