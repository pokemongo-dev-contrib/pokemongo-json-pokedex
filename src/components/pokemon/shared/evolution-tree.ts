import { Identifyable } from '@core/identifyable';

class EvolutionTree implements Identifyable {
    /**
     * An EvolutionTree represents all possible future evolutions of a pokemon.
     * Mutually exclusive choices are given on the same level, while sequential
     * choices are presented in increasing depth.
     *
     * For example, Eevee's EvolutionTree would take 6 objects in depth 2, but
     * Charmander's EvolutionTree would take 3 objects in depth 3.
     */
    public name: string;
    public id: string;
    public futureEvolutions: EvolutionTree[] = [];
    public constructor(name: string, id: string, futureEvolutions: EvolutionTree[] = []) {
        this.name = name;
        this.id = id;
        this.futureEvolutions = futureEvolutions;
    }

    public mapInLevel(treeLevel: number, mapperFunction: (EvolutionTree) => EvolutionTree): EvolutionTree {
        /**
         * mapInLevel() is like map(), but only works on a given level. The
         * types aren't quite a match, but the concept is similar. The idea
         * is if you request level 3, then mapInLevel gives you an
         * EvolutionTree with the third level swapped out based on the function
         * given.
         */
        if (treeLevel === 0) {
            return mapperFunction(this);
        } else {
            return new EvolutionTree(
                this.name,
                this.id,
                this.futureEvolutions.map(evo => evo.mapInLevel(treeLevel - 1, mapperFunction))
            );
        }
    }
}

export { EvolutionTree };