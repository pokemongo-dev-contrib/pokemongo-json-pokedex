import { Locale } from '../../locales/locale.interface';

export class ItemLocalTranslations {
    name: string;
    description: string;
}


export type ItemLocal = Locale<ItemLocalTranslations>;
