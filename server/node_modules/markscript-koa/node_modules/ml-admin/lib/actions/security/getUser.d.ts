import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface UserInfo {
    id: string;
    name: string;
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
}
export declare function getUser(client: Client, name: string): Promise<UserInfo>;
