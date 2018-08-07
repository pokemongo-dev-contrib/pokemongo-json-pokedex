import { Component, IComponent } from '@core/pipeline/index';
import { ItemTemplate } from '@income/index';
import { Pokemon } from '@outcome/pokemon/index';
import { Util } from '@util/index';
import * as _ from 'lodash';

@Component({
  pipeline: 'pokemon'
})
export class CinematicMoves implements IComponent {
  Process(pokemon: Pokemon, rawPokemon: ItemTemplate): Pokemon {
    pokemon.cinematicMoves = rawPokemon.pokemonSettings.cinematicMoves.map(Util.SnakeCase2Identifyable);
    return pokemon;
  }
}
