import { RootObject, ItemTemplate } from '../../core/game_master';
import { Move, MoveMapper } from './'
import { Parser } from '../../core/parser';

export class MoveParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_MOVE_?.*)', 'g');
    constructor(private gameMaster: RootObject) { }
    private isItemTemplateMove(item: ItemTemplate): boolean {
        return this.regexp.test(item.templateId);
    }
    public Parse(): Move[] {
        return this.gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplateMove(p); })
            .map(p => MoveMapper.Map(p));
    }
}