import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class QuickMoves implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.quickMoves = rawPokemon.pokemonSettings.quickMoves.map(Util.SnakeCase2Identifyable);
    return pokemon;
  }
}