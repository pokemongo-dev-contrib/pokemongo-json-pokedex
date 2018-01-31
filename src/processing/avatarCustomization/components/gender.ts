import { Component, IComponent } from '@core/pipeline';

import { AvatarCustomization } from '@outcome/avatarCustomization';
import { ItemTemplate } from '@income';
import { Util } from '@util';

@Component({
    pipeline: 'avatarCustomization'
})
export class Gender implements IComponent {
    /**
     * Parses the Gender out of a templateId-string
     * @param input The avatarCostumization templateId
     * @returns {Gender} The gender parsed out of the given templateId string
     * @example
     * new GenderParser().Process('AVATAR_m_hat_default_3'); // Gender.Male;
     * new GenderParser().Process('AVATAR_f_hat_default_3'); // Gender.Female;
     */
    Process(avatarCustomization: AvatarCustomization, rawAvatarCustomzation: ItemTemplate): AvatarCustomization {
        let match: RegExpExecArray = new RegExp('AVATAR_(.)_?.*', 'g').exec(rawAvatarCustomzation.templateId);
        let genderOutput: string;

        switch (match[1]) {
            case 'f':
                genderOutput = 'Female';
                break;
            case 'm':
                genderOutput = 'Male';
                break;
            default:
                throw 'Gender could not get identified';
        }
        avatarCustomization.gender = genderOutput;
        return avatarCustomization;
    }
}