import { GameMaster, ItemTemplate } from '../../core/game_master';
import { Parser } from '../../core/parser';
import { Pokemon, PokemonMapper } from './';

class PokemonParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g');
    constructor(private gameMaster: GameMaster) { }
    private isItemTemplatePokemon(item: ItemTemplate): boolean {
        return this.regexp.test(item.templateId);
    }

    public Parse(): Pokemon[] {
        return this.gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplatePokemon(p); })
            .map(p => PokemonMapper.Map(p));
    }
}

export { PokemonParser };