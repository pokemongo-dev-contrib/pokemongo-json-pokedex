import { EvolutionCostToEvolve } from './evolutionCostToEvolve';
import { Identifyable } from '@core';
export interface FutureEvolutionBranch extends Identifyable {
    /**
     * The cost in order to evolve
     */
    costToEvolve: EvolutionCostToEvolve;
    /**
     * Future evolution branches of this Pokemon
     */
    futureBranches?: FutureEvolutionBranch[]
}
