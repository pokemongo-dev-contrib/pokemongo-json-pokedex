import { Component } from '@core/component';

/**
 * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
 */
export class DexParser implements Component {
    /**
     * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
     * @param {String} id The templateId to parse
     * @returns {Number} The parsed dex number
     */
    Process(id: string): number {
        return parseInt(id.split('_')[0].slice(1), 10)
    }
}
