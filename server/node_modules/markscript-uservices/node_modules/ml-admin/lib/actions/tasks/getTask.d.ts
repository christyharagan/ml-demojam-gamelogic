import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface DatabaseInfo {
    id: string;
    name: string;
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
}
export declare function getTask(client: Client, name: string): Promise<DatabaseInfo>;
