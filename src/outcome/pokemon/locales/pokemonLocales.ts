import { Locale } from '../../locales/locale.interface';

export class PokemonLocalTranslations {
    name: string;
    description: string;
    category: string;
}


export type PokemonLocal = Locale<PokemonLocalTranslations>;
