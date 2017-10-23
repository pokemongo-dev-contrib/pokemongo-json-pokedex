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

        let typeIds = new Map<number, string>();

        typeIds.set(0, 'POKEMON_TYPE_NORMAL');
        typeIds.set(1, 'POKEMON_TYPE_FIGHTING');
        typeIds.set(2, 'POKEMON_TYPE_FLYING');
        typeIds.set(3, 'POKEMON_TYPE_POISON');
        typeIds.set(4, 'POKEMON_TYPE_GROUND');
        typeIds.set(5, 'POKEMON_TYPE_ROCK');
        typeIds.set(6, 'POKEMON_TYPE_BUG');
        typeIds.set(7, 'POKEMON_TYPE_GHOST');
        typeIds.set(8, 'POKEMON_TYPE_STEEL');
        typeIds.set(9, 'POKEMON_TYPE_FIRE');
        typeIds.set(10, 'POKEMON_TYPE_WATER');
        typeIds.set(11, 'POKEMON_TYPE_GRASS');
        typeIds.set(12, 'POKEMON_TYPE_ELECTRIC');
        typeIds.set(13, 'POKEMON_TYPE_PSYCHIC');
        typeIds.set(14, 'POKEMON_TYPE_ICE');
        typeIds.set(15, 'POKEMON_TYPE_DRAGON');
        typeIds.set(16, 'POKEMON_TYPE_DARK');
        typeIds.set(17, 'POKEMON_TYPE_FAIRY');

        return types.map(p => TypeMapper.Map(p, typeIds));
    }
}

export { TypeParser };
