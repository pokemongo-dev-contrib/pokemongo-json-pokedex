import { Component } from '@core/component';
import { Util } from '@util';

/**
 * Parses the name out of a templateId-String
 */
export class NameParser implements Component {
    private readonly regexNameParser: RegExp = new RegExp('AVATAR_(.*?)_(.*)', 'g');
    /**
     * Parses the name out of a templateId-string
     * @param input The avatarCostumization templateId
     * @returns {string} The name of item parsed out of the given templateId string
     */
    Process(templateId: string): string {
        let match: RegExpExecArray = this.regexNameParser.exec(templateId);
        return Util.SnakeCase2HumanReadable(match[2]);
    }
};