import { RootObject, ItemTemplate } from '@core/game_master';
import { Parser } from '@core/parser';
import { AvatarCustomization } from './avatar-customization.model';
import { AvatarCustomizationMapper } from './avatar-customuization.mapper';

export class AvatarCustomizationParser implements Parser {
     private readonly avatarCostumizationRegex: string = '^(AVATAR_?.*)';
    private isItemTemplateAvatarCostumization(item: ItemTemplate): boolean {
        return new RegExp(this.avatarCostumizationRegex, 'g').test(item.templateId);
    }
    public Parse(gameMaster: RootObject): AvatarCustomization[] {
        return gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplateAvatarCostumization(p); })
            .map(p => AvatarCustomizationMapper.Map(p));
    }
}