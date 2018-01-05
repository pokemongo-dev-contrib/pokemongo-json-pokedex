import { EvolutionCostToEvolve } from './evolutionCostToEvolve';
import { Identifyable } from '@core';
export interface PastEvolutionBranch extends Identifyable {
    /**
     * The cost in order to evolve
     */
    costToEvolve: EvolutionCostToEvolve;
    /**
     * Past evolution branches of this Pokemon
     */
    pastBranch?: PastEvolutionBranch
}
