import { RootObject, ItemTemplate } from '@core/game_master';
import { Parser } from '@core/parser';
import { Move, MoveMapper } from './'

export class MoveParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_MOVE_?.*)', 'g');
    private isItemTemplateMove(item: ItemTemplate): boolean {
        return this.regexp.test(item.templateId);
    }
    public Parse(gameMaster: RootObject): Move[] {
        return gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplateMove(p); })
            .map(p => MoveMapper.Map(p));
    }
}