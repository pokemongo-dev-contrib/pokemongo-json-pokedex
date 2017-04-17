import { Component } from '@core/component';
import { Util } from '@util';

/**
 * Parses the category out of a string (avatarCostumization.groupName)
 */
export class CategoryParser implements Component {
    private readonly regexCategoryIdentifier: RegExp = new RegExp('group_(.*)', 'g');
    /**
     * Parses the category out of a string (avatarCostumization.groupName)
     * @param {String} groupName The string to parse the category
     * @returns {String} The category parsed
     */
    Process(groupName: string): string {
        let match: RegExpExecArray = this.regexCategoryIdentifier.exec(groupName);
        if (!match.length) {
            throw `Could not parse Category from ${groupName}`
        };
        return Util.SnakeCase2HumanReadable(match[1]);
    }
}