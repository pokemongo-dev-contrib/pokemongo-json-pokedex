import { EvolutionCostToEvolve, FutureEvolutionBranch, PastEvolutionBranch } from './';

export interface PokemonEvolution {
    /**
     * The cost in order to evolve
     */
    costToEvolve: EvolutionCostToEvolve;
    /**
     * Past evolution branches of this Pokemon
     */
    pastBranches: PastEvolutionBranch[];
    /**
     * Future evolution branches of this Pokemon
     */
    futureBranches: FutureEvolutionBranch[];
}