import { EvolutionBranch } from '@income';

export const getPokemonIdByEvolutionBranch = (branch: EvolutionBranch) => {
    const formId = branch.form;
    let pokemonId: string;
    // Check if form ends does not end with NORMAL (so e.g. ALOLAN)
    if (formId && !formId.endsWith('_NORMAL')) {
        pokemonId = formId;
    } else {
        pokemonId = branch.evolution;
    }
    return pokemonId;
};
