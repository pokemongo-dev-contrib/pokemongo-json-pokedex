import { Component, IComponent } from '@core/pipeline';

import { AvatarCustomization } from '@outcome/avatarCustomization';
import { ItemTemplate } from '@income';
import { Util } from '@util';

@Component({
  pipeline: 'avatarCustomization'
})
export class Category implements IComponent {
  /**
   * Parses the english name of the costumization
   */
  Process(avatarCustomization: AvatarCustomization, rawAvatarCustomization: ItemTemplate): AvatarCustomization {
    const groupName = rawAvatarCustomization.avatarCustomization.groupName;
    const match: RegExpExecArray = new RegExp('group_(.*)', 'g').exec(groupName);
    if (!match.length) {
        throw `Could not parse Category from ${groupName}`
    }

    avatarCustomization.category = Util.SnakeCase2HumanReadable(match[1]);
    return avatarCustomization;
  }
}