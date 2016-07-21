import {FormatName} from '../lib/helper';
import _ from 'lodash';

class PokemonNormalizer {
    static Normalize(pokemonsRaw) {
        return pokemonsRaw.map((pokemonRaw) => {
            let [Id, Type, Name] = _(pokemonRaw.data.UniqueId)
                .split('_')
                .value();
            Id = parseInt(Id.substring(1, Id.length));
            let Types = [];
            if (pokemonRaw.data.Type1 !== undefined) {
                Types.push(FormatName(pokemonRaw.data.Type1, 2));
            }
            if (pokemonRaw.data.Type2 !== undefined) {
                Types.push(FormatName(pokemonRaw.data.Type2, 2));
            }
            let pokemon = {
                Type: pokemonRaw.type,
                Id: Id,
                Name: Name.toLowerCase().capitalizeFirstLetter(),
                Types: Types,
                Encounter: {
                    BaseCaptureRate: pokemonRaw.data.Encounter.BaseCaptureRate,
                    BaseFleeRate: pokemonRaw.data.Encounter.BaseFleeRate,
                    DodgeInterval: pokemonRaw.data.Encounter.MovementTimerS,
                    AttackTimer: pokemonRaw.data.Encounter.AttackTimerS
                },
                Stats: pokemonRaw.data.Stats,
                AverageHeight: pokemonRaw.data.PokedexHeightM,
                AverageWeight: pokemonRaw.data.PokedexWeightKg
            };
            if (pokemonRaw.data.Evolution !== undefined) {
                pokemon.EvolutionId = parseInt(pokemonRaw.data.Evolution.replace('"', '').replace('\\', ''));
            }
            console.log(pokemon);
            
            return _.omitBy(pokemon, _.isNil);
        });
    }
}

module.exports = PokemonNormalizer;