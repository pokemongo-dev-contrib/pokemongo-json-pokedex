import { NameParser } from './shared/name-parser.component';
import { CategoryParser } from './shared/category-parser.component';
import { ItemTemplate } from '@core/game_master';
import { AvatarCustomization } from './avatar-customization.model';
import { GenderParser } from './shared/gender-parser.component';
import { Gender } from './shared/gender';
import { Util } from '@util';

export class AvatarCustomizationMapper {
    public static Map(rawAvatarCustomization: ItemTemplate): AvatarCustomization {
        let avatarCustomization: AvatarCustomization = new AvatarCustomization();

        let gender: Gender = new GenderParser().Process(rawAvatarCustomization.templateId);

        // Little hack to get name of the enum, not the value
        avatarCustomization.gender = Gender[gender];
        avatarCustomization.enabled = rawAvatarCustomization.avatarCustomization.enabled;
        avatarCustomization.slot = rawAvatarCustomization
            .avatarCustomization
            .slot
            .map(slot => Util.FirstCharacter2Uppercase(slot.toLowerCase()));

        avatarCustomization.category = new CategoryParser()
            .Process(rawAvatarCustomization.avatarCustomization.groupName);

        avatarCustomization.name = new NameParser().Process(rawAvatarCustomization.templateId);
        avatarCustomization.unlockPlayerLevel = rawAvatarCustomization.avatarCustomization.unlockPlayerLevel;

        avatarCustomization.id = rawAvatarCustomization.avatarCustomization.assetName;
        return avatarCustomization;
    }
}