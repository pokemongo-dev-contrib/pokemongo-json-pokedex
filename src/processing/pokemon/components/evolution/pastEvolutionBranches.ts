// import { Component, IComponent, ComponentType } from '@core/pipeline/component';
// import { ItemTemplate } from '@income';
// import { Pokemon } from '@outcome/pokemon';
// import { Util } from '@util';

// /**
//  * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//  */
// @Component({
//   pipeline: 'pokemon',
//   type: ComponentType.ADVANCED_MAP
// })
// export class PastEvolutionsBranches implements IComponent {
//   /**
//    * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//    * @param {String} id The templateId to parse
//    */
//   Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
//     // This generates one pastEvolution for all pokemon
//     let backrefs = pokemons.reduce((backrefsTemporary, pokemon) => {
//       pokemon.nextEvolutionBranches.forEach(branch => backrefsTemporary.set(branch.id, [pokemon]));
//       return backrefsTemporary;
//     }, new Map<string, Pokemon[]>());

//     // Use graph traversal to fill in more pastEvolutions
//     // TODO: Use a for loop to iterate over more than 2 previous evolutions.
//     backrefs.forEach((pastPokemonList, backrefIndex, backrefsTemp) => pastPokemonList.forEach(currentPastEvolution => {
//       if (!backrefsTemp.has(currentPastEvolution.id)) { return; }

//       const newPastEvolutions = backrefsTemp.get(currentPastEvolution.id);
//       backrefs.set(backrefIndex, newPastEvolutions.concat(pastPokemonList));
//     }));

//     return pokemons.map(pokemon => {
//       const pastEvolutions = backrefs.get(pokemon.id);
//       if (pastEvolutions === undefined || pastEvolutions.length === 0) {
//         return pokemon;
//       }
//       pokemon.pastEvolutions = pokemon.pastEvolutions || [];
//       pokemon.pastEvolutions = pastEvolutions
//         .map(currentPriorEvolution => {
//           return { name: currentPriorEvolution.name, id: currentPriorEvolution.id };
//         })
//         .concat(pokemon.pastEvolutions);

//       return pokemon;
//     });
//   }
// }