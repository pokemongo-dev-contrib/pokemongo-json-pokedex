import { Identifyable } from '@core/identifyable';
import { Gender } from './shared/gender';

export class AvatarCustomization {
    public enabled: boolean;
    public gender: string;
    public slot: string[];
    public name: string;
    public id: string;
    public unlockPlayerLevel: number;
    public category: string;
}