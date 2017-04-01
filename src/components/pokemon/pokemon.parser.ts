import { RootObject, ItemTemplate } from '../../core/game_master';
import { Parser } from '../../core/parser';
import { Pokemon, PokemonMapper } from './';

class PokemonParser implements Parser {
    private regexp: RegExp = new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g');
    constructor(private gameMaster: RootObject) { }
    private isItemTemplatePokemon(item: ItemTemplate): boolean {
        return this.regexp.test(item.templateId) || this.regexp.test(item.templateId);
    }

    public Parse(): Pokemon[] {
        let rv = this.gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplatePokemon(p); })
            .map(p => PokemonMapper.Map(p));
        rv = this.generateBackrefs(rv);
        return rv;
    }

    public generateBackrefs(parsedMons: Pokemon[]): Pokemon[] {
        let backrefs = parsedMons.reduce((refsTmp, mon) => {
            mon.nextEvolutionBranches.forEach(branch => refsTmp.set(branch.id, mon));
            return refsTmp;
        }, new Map<string, Pokemon>());

        return parsedMons.map(mon => {
            const pastEvo = backrefs.get(mon.id);
            if (pastEvo === undefined) {
                return mon;
            }
            mon.pastEvolutions = mon.pastEvolutions || [];
            return {
                ...mon,
                pastEvolutions: [...mon.pastEvolutions, {name: pastEvo.name, id: pastEvo.id}]
            };
        });
    }
}

export { PokemonParser };