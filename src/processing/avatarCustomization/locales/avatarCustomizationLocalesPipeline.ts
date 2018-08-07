import { Translation } from '@income';
import { LocalesPipeline } from '@core/pipeline/localePipeline';
import { AvatarCustomization, AvatarCustomizationTranslations } from '@outcome/avatarCustomization';

export class AvatarCustomizationLocalesPipeline extends LocalesPipeline<AvatarCustomization, AvatarCustomizationTranslations> {
    constructor(
        translations: Translation[],
        entities: AvatarCustomization[],
        locales: string[]) {
        super(translations, entities, locales, custom => custom.id);
    }

    async mapData(translation: AvatarCustomizationTranslations, avatarCustomization: AvatarCustomization, localeName: string) {
        try {
            translation.name = this.generateLocaleByKey(`avatar_${avatarCustomization.iconName}`, localeName)
        }
        catch (err) {
        }
        return translation;
    }
}
