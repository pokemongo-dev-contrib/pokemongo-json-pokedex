// import { Component, ComponentType, IComponent } from '@core/pipeline/component';

// import { Identifyable } from '@core/identifyable';
// import { ItemTemplate } from '@income';
// import { NextEvolutionBranches } from 'src/processing/pokemon/components/evolution/nextEvolutionBranches';
// import { PastEvolutionsBranches } from './pastEvolutionBranches';
// import { Pokemon } from '@outcome/pokemon';
// import { Util } from '@util';

// class EvolutionTree implements Identifyable {
//   /**
//    * An EvolutionTree represents all possible future evolutions of a pokemon.
//    * Mutually exclusive choices are given on the same level, while sequential
//    * choices are presented in increasing depth.
//    *
//    * For example, Eevee's EvolutionTree would take 6 objects in depth 2, but
//    * Charmander's EvolutionTree would take 3 objects in depth 3.
//    */
//   public name: string;
//   public id: string;
//   public candyCost: number;
//   public evolutionItem: Identifyable;
//   public kmBuddyDistanceRequirement: number;
//   public futureEvolutions: EvolutionTree[] = [];
//   public constructor(name: string, id: string, candyCost: number = undefined, evolutionItem: Identifyable = undefined, kmBuddyDistanceRequirement: number = undefined, futureEvolutions: EvolutionTree[] = []) {
//     this.name = name;
//     this.id = id;
//     this.candyCost = candyCost;
//     this.evolutionItem = evolutionItem;
//     this.kmBuddyDistanceRequirement = kmBuddyDistanceRequirement;
//     this.futureEvolutions = futureEvolutions;
//   }

//   public mapInLevel(treeLevel: number, mapperFunction: (EvolutionTree) => EvolutionTree): EvolutionTree {
//     /**
//      * mapInLevel() is like map(), but only works on a given level. The
//      * types aren't quite a match, but the concept is similar. The idea
//      * is if you request level 3, then mapInLevel gives you an
//      * EvolutionTree with the third level swapped out based on the function
//      * given.
//      */
//     if (treeLevel === 0) {
//       return mapperFunction(this);
//     } else {
//       return new EvolutionTree(
//         this.name,
//         this.id,
//         this.candyCost,
//         this.evolutionItem,
//         this.kmBuddyDistanceRequirement,
//         this.futureEvolutions.map(evo => evo.mapInLevel(treeLevel - 1, mapperFunction))
//       );
//     }
//   }
// }

// /**
//  * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//  */
// @Component({
//   pipeline: 'pokemon',
//   type: ComponentType.ADVANCED_MAP,
//   // after: [
//   //   PastEvolutionsBranches,
//   // ],
// })
// export class FutureEvolutionBranches implements IComponent {
//   private GetPokemonIdMap(pokemons) {
//     return pokemons.reduce((temporaryIdMap, currentPokemon) => {
//       temporaryIdMap.set(currentPokemon.id, currentPokemon);
//       return temporaryIdMap;
//     }, new Map<string, Pokemon>())
//   }

//   private GetEvolutionTreeFromPastEvolutions(pokemonObject, pokemonIdMap) {
//     const preEvolution = pokemonIdMap.get(pokemonObject.pastEvolutions[pokemonObject.pastEvolutions.length - 1].id);
//     const evolutionCost = preEvolution.nextEvolutionBranches.find(evolution => evolution.id === pokemonObject.id);
//     pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id, evolutionCost.candyCost, evolutionCost.evolutionItem, evolutionCost.kmBuddyDistanceRequirement);
//   }
//   /**
//    * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//    * @param {String} id The templateId to parse
//    */
//   Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
//     // First, we need a mapping from ID to Pokemon.
//     const pokemonIdMap = this.GetPokemonIdMap(pokemons);

//     // And now, graph traversal...
//     pokemonIdMap.forEach((pokemonObject, pokemonId) => {
//       if (pokemonObject.futureEvolutions === undefined) {
//         if (pokemonObject.pastEvolutions && pokemonObject.pastEvolutions.length) {
//           pokemonObject.futureEvolutions = this.GetEvolutionTreeFromPastEvolutions(pokemonObject, pokemonIdMap)
//         } else {
//           pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id);
//         }
//       }
//       for (let treeLevel = 0; treeLevel < 2; treeLevel++) {
//         const futureEvolutions =
//           new EvolutionTree(pokemonObject.futureEvolutions.name,
//             pokemonObject.futureEvolutions.id,
//             pokemonObject.futureEvolutions.candyCost,
//             pokemonObject.futureEvolutions.evolutionItem,
//             pokemonObject.futureEvolutions.kmBuddyDistanceRequirement);

//         pokemonObject.futureEvolutions = futureEvolutions.mapInLevel(treeLevel, currentSubtree => {
//           const currEntry = pokemonIdMap.get(currentSubtree.id);
//           let evolutionCost: Identifyable = { name: currentSubtree.name, id: currentSubtree.id };
//           if (currEntry.pastEvolutions && currEntry.pastEvolutions.length) {
//             const preEvolution = pokemonIdMap.get(currEntry.pastEvolutions[currEntry.pastEvolutions.length - 1].id);
//             evolutionCost = preEvolution.nextEvolutionBranches.filter(evolution => evolution.id === currEntry.id)[0];
//             pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id, evolutionCost.candyCost, evolutionCost.evolutionItem, evolutionCost.kmBuddyDistanceRequirement);
//           }

//           return new EvolutionTree(
//             currentSubtree.name,
//             currentSubtree.id,
//             evolutionCost.candyCost,
//             evolutionCost.evolutionItem,
//             evolutionCost.kmBuddyDistanceRequirement,
//             currEntry.nextEvolutionBranches.map(evolutionBranch => new EvolutionTree(evolutionBranch.name, evolutionBranch.id, evolutionBranch.candyCost, evolutionBranch.evolutionItem, evolutionBranch.kmBuddyDistanceRequirement))
//           );
//         })
//       }
//     });
//     return Array.from(pokemonIdMap.values());
//   }
// }