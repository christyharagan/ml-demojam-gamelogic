import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface ListItems {
}
export interface RolesInfo {
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
    'list-items': ListItems;
}
export declare function getRoles(client: Client, name: string): Promise<RolesInfo>;
