import { Gender } from './gender';
import { Component } from '@core/component';

/**
 * Parses the Gender out of a templateId-String
 */
export class GenderParser implements Component {
    private readonly regexGenderIdentifier: RegExp = new RegExp('AVATAR_(.)_?.*', 'g');
    /**
     * Parses the Gender out of a templateId-string
     * @param input The avatarCostumization templateId
     * @returns {Gender} The gender parsed out of the given templateId string
     * @example
     * new GenderParser().Process('AVATAR_m_hat_default_3'); // Gender.Male;
     * new GenderParser().Process('AVATAR_f_hat_default_3'); // Gender.Female;
     */
    Process(templateId: string): Gender {
        let match: RegExpExecArray = this.regexGenderIdentifier.exec(templateId);
        let genderOutput: Gender;

        switch (match[1]) {
            case 'f':
                genderOutput = Gender.Female;
                break;
            case 'm':
                genderOutput = Gender.Male;
                break;
            default:
                throw 'Gender could not get identified';
        }

        return genderOutput;
    }


};