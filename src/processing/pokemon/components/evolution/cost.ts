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
// export class Cost implements IComponent {
//   /**
//    * Parses the dex number out of the templateId (eg: "V0151_POKEMON_MEW" => 151)
//    * @param {String} id The templateId to parse
//    */
//   Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
    // const dictionary = pokemons.reduce((dictionaryTemp, pokemon) => {
    //   dictionaryTemp.set(pokemon.id, pokemon)
    //   return dictionaryTemp;
    // }, new Map<string, Pokemon>());

    // return pokemons.map(pokemon => {
    //   if (pokemon.pastEvolutions) {
    //     pokemon.pastEvolutions = pokemon.pastEvolutions.map(pastPokemon => {
    //       const pastPokemonTemp = dictionary.get(pastPokemon.id)
    //       pastPokemon.candyCost = pastPokemonTemp.futureEvolutions.candyCost;
    //       pastPokemon.evolutionItem = pastPokemonTemp.futureEvolutions.evolutionItem;
    //       pastPokemon.kmBuddyDistanceRequirement = pastPokemonTemp.futureEvolutions.kmBuddyDistanceRequirement;
    //       return pastPokemon;
    //     })
    //   }

    //   return pokemon;
//     });
//   }
// }