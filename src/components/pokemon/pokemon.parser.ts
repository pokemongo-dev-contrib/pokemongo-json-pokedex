import { RootObject, ItemTemplate } from '../../core/game_master';
import { Parser } from '../../core/parser';
import { Identifyable } from '../../core/identifyable';
import { Pokemon, PokemonMapper, EvolutionTree } from './';

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
        rv = this.generateFrontRefs(rv);
        return rv;
    }

    public generateBackrefs(parsedMons: Pokemon[]): Pokemon[] {
        // This generates one pastEvolution for all pokemon
        let backrefs = parsedMons.reduce((refsTmp, mon) => {
            mon.nextEvolutionBranches.forEach(branch => refsTmp.set(branch.id, [mon]));
            return refsTmp;
        }, new Map<string, Pokemon[]>());

        // Use graph traversal to fill in more pastEvolutions
        // TODO: Use a for loop to iterate over more than 2 previous evolutions.
        backrefs.forEach((monsList, idx, refsTmp) => monsList.forEach(mon => {
            if (!refsTmp.has(mon.id)) { return; }
            const prevs = refsTmp.get(mon.id);
            backrefs.set(idx, prevs.concat(monsList));
        }));

        // Finally, update the parsedPokemon list.
        return parsedMons.map(mon => {
            const pastEvos = backrefs.get(mon.id);
            if (pastEvos === undefined || pastEvos.length === 0) {
                return mon;
            }
            mon.pastEvolutions = mon.pastEvolutions || [];
            mon.pastEvolutions = pastEvos
                .map(evo => { return { name: evo.name, id: evo.id }; })
                .concat(mon.pastEvolutions);
            return mon;
        });
    }

    public generateFrontRefs(parsedMons: Pokemon[]): Pokemon[] {
        // First, we need a mapping from ID to Pokemon.
        let pokemap = parsedMons.reduce((mapTmp, mon) => {
            mapTmp.set(mon.id, mon);
            return mapTmp;
        }, new Map<string, Pokemon>());

        // And now, graph traversal...
        for (let level = 0; level < 2; level++) {
            pokemap.forEach((mon, monId) => {
                if (mon.futureEvolutions === undefined) {
                    mon.futureEvolutions = new EvolutionTree(mon.name, mon.id);
                }
                mon.futureEvolutions = mon.futureEvolutions.mapInLevel(level, tree => {
                    const currEntry = pokemap.get(tree.id);
                    return new EvolutionTree(
                        tree.name,
                        tree.id,
                        currEntry.nextEvolutionBranches.map(branch => new EvolutionTree(branch.name, branch.id))
                    );
                })
            });
        }
        return Array.from(pokemap.values());
    }
}

export { PokemonParser };