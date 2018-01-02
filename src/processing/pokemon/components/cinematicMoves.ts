import { Component, IComponent } from '@core/pipeline';
import { ItemTemplate } from '@income';
import { Pokemon } from '@outcome/pokemon';
import { Util } from '@util';

@Component({
  pipeline: 'pokemon'
})
export class CinematicMoves implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.cinematicMoves = rawPokemon.pokemonSettings.cinematicMoves.map(Util.SnakeCase2Identifyable);
    return pokemon;
  }
}