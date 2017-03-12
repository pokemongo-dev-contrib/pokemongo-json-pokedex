import * as _ from 'underscore';
import { Identifyable } from '../core/identifyable.interface';

export default class Util {
    public static FirstCharacter2Uppercase(text: string): string {
        return text
            .charAt(0)
            .toUpperCase() + text.slice(1);
    }

    public static SnakeCase2HumanReadable(snakeCase: string): string {
        return _(snakeCase
            .toLowerCase()
            .split('_'))
            .map(Util.FirstCharacter2Uppercase)
            .join(' ');
    }

    public static SankeCase2Identifyable(snakeCase: string): Identifyable {
        return {
            name: Util.SnakeCase2HumanReadable(snakeCase),
            id: snakeCase
        }
    }
}