import { Component, IComponent } from '@core/pipeline';

import { AvatarCustomization } from '@outcome/avatarCustomization';
import { ItemTemplate } from '@income';
import { Util } from '@util';

@Component({
  pipeline: 'avatarCustomization'
})
export class Name implements IComponent {
  /**
   * Parses the english name of the costumization
   */
  Process(avatarCustomization: AvatarCustomization, rawAvatarCustomzation: ItemTemplate): AvatarCustomization {
    const match: RegExpExecArray = new RegExp('AVATAR_(.*?)_(.*)', 'g').exec(rawAvatarCustomzation.templateId);
    avatarCustomization.name = Util.SnakeCase2HumanReadable(match[2]);
    return avatarCustomization;
  }
}