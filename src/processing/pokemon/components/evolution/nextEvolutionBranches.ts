

// import { Component, IComponent } from '@core/pipeline';
// import { ItemTemplate } from '@income';
// import { Pokemon } from '@outcome/pokemon';
// import { Util } from '@util';

// /**
//  * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//  */
// @Component({
//   pipeline: 'pokemon'
// })
// export class NextEvolutionBranches implements IComponent {
//   /**
//    * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//    * @param {String} id The templateId to parse
//    */
//   Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
//     pokemon.nextEvolutionBranches = (rawPokemon.pokemonSettings.evolutionBranch || []).map(branch => {
//       const identifyable = Util.SnakeCase2Identifyable(branch.evolution);
//       const evolutionItem = branch.evolutionItemRequirement ? {
//         id: branch.evolutionItemRequirement,
//         name: Util.SnakeCase2HumanReadable(branch.evolutionItemRequirement.replace('ITEM_', ''))
//       } : undefined;

//       return {
//         ...identifyable,
//         candyCost: branch.candyCost,
//         evolutionItem: evolutionItem,
//         kmBuddyDistanceRequirement: branch.kmBuddyDistanceRequirement
//       }
//     });
//     return pokemon;
//   }
// }