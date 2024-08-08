import { IBaseItem } from "./IBaseItem";

export interface IChecklistItem extends IBaseItem {
    collected: boolean;
}