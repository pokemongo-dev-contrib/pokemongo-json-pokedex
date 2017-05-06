import { RootObject, ItemTemplate } from '@core/game_master';
import { Parser } from '@core/parser';
import { Move, MoveMapper } from './'
import * as _ from 'lodash';

export class MoveParser implements Parser {
    private readonly moveRegex: string = '^(V[0-9]+_MOVE_?.*)';
    private isItemTemplateMove(item: ItemTemplate): boolean {
        return new RegExp(this.moveRegex, 'g').test(item.templateId);
    }
    public Parse(gameMaster: RootObject): Move[] {
        return gameMaster
            .itemTemplates
            .filter(p => this.isItemTemplateMove(p))
            .map(p => MoveMapper.Map(p));
    }
}