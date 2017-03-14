import { ItemTemplate } from './game_master/gameMaster';
export interface Mapper {
    Map(raw: ItemTemplate): any
}