import { Component, IComponent } from '@core/pipeline';

import { AvatarCustomization } from '@outcome/avatarCustomization';
import { ItemTemplate } from '@income';

@Component({
  pipeline: 'avatarCustomization'
})
export class GenericPropertyMapper implements IComponent {
  /**
   * Maps generic properties which do not need to be processed.
   */
  Process(avatarCustomization: AvatarCustomization, rawAvatarCustomization: ItemTemplate): AvatarCustomization {
    avatarCustomization.enabled = rawAvatarCustomization.avatarCustomization.enabled;
    avatarCustomization.unlockPlayerLevel = rawAvatarCustomization.avatarCustomization.unlockPlayerLevel;
    avatarCustomization.id = rawAvatarCustomization.avatarCustomization.assetName;
    avatarCustomization.unlockBadgeLevel = rawAvatarCustomization.avatarCustomization.unlockBadgeLevel;
    avatarCustomization.iconName = rawAvatarCustomization.avatarCustomization.iconName;
    return avatarCustomization;
  }
}