import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface ListItems {
}
export interface ForestsInfo {
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
    'list-items': ListItems;
}
export declare function getForests(client: Client, name: string): Promise<ForestsInfo>;
