import { Component, IComponent } from '@core/pipeline';

import { AvatarCustomization } from '@outcome/avatarCustomization';
import { ItemTemplate } from '@income';
import { Util } from '@util';

@Component({
  pipeline: 'avatarCustomization'
})
export class Slot implements IComponent {
  /**
   * Maps generic properties which do not need to be processed.
   */
  Process(avatarCustomization: AvatarCustomization, rawAvatarCustomization: ItemTemplate): AvatarCustomization {
    avatarCustomization.slot = rawAvatarCustomization
            .avatarCustomization
            .slot
            .map(slot => Util.FirstCharacter2Uppercase(slot.toLowerCase()));
    return avatarCustomization;
  }
}