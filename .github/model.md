# Models

## Pokemon

- **name** *string* - The name of the Pokemon (Example: `Bulbasaur` or `Ho Oh`)
- **id** *string* - An unique identfier for the Pokemon (Example: `BULBASAUR` or `HO_OH`)
- **modelScale** *number* - The scale of the Pokemon model which gets displayed in the game (Example: `1.03` or `1.05`)
- **modelHeight** *number* - The height of the model, which gets displayed in the game (Example: `1.25`)
- **types** *[Identifyable[]](#identifyable)* - Array of types the Pokemon has. (Example:
`[{"id": "POKEMON_TYPE_PSYCHIC","name": "Psychic"}]`) 
- **encounter** *PokemonEncounter*
- **camera** *PokemonCamera*
- **stats** *PokemonStats*
- **quickMoves** *[Identifyable[]](#identifyable)* - The quick moves a Pokemon can learn. (Example: `[{"name": "Pound Fast","id": "POUND_FAST"},{"name": "Confusion Fast","id": "CONFUSION_FAST"}]`)
- **cinematicMoves** *[Identifyable[]](#identifyable)* - The cinematic moves a Pokemon can learn. (Example: `[{"name": "Psybeam","id": "PSYBEAM"},{"name": "Psyshock","id": "PSYSHOCK"},{"name": "Psychic","id": "PSYCHIC"}]`)

- **animationTime** *number[]* - Unknown
- **rarity** *[Identifyable](#identifyable)* - The rarity of the Pokemon. (Example: `{"id": "POKEMON_RARITY_LEGENDARY","name": "Legendary"}`)
- **height** *number* - The height of the Pokemon, relative to Ivysaur, Wartortle, (...). (Example: Wartortle.height = `1` Weedle.height = `0.6`)
- **weight** *number* - The weight of the Pokemon, relative to Koffing, Igglybuff, (...). (Example: Koffing.weight = `1` Clefairy.weight = `3`)
- **family** *[Identifyable](#identifyable)* - The "family" the Pokemon is in. (Example Bulbasaur.family = `{"id": "FAMILY_BULBASAUR","name": "Bulbasaur"}`)
- **kmBuddyDistance** *number* - The distance you have to walk your Pokemon in kilometers, to get a candy (Example: `3`)
- **maxCP** *number* The maximum CP amount the Pokemon can reach with max Level (Example: `981`)
- **buddySize** *[Identifyable](#identifyable)* - The size of the Pokemon as buddy. (Example: `{"id": "BUDDY_BIG","name": "Big"}`)
- **nextEvolutionBranches** *[Identifyable[]](#identifyable)* - The next future evolution the Pokemon has. Most Pokemon have only one item, but Pokemon like Eevee can evolve in different Pokemon, like Vaporeon, Jolteon, Flareon, (...). (Example: `[{"name": "Ivysaur","id": "IVYSAUR"}]`)
- **futureEvolutions** *EvolutionTree* - All the possible future evolutions of the Pokemon, including indirect
     evolutions. (Example: given Charmander, futureEvolutions would list Charmeleon and Charizard.)
- **pastEvolutions** *[Identifyable[]](#identifyable)* The direct past evolution of the Pokemon. Example `[{"name": "Bulbasaur","id": "BULBASAUR"}]`

## Identifyable
- **id** *string* The unique identification
- **name** *string* The "human-readable" name