import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface AppServerInfo {
    id: string;
    name: string;
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
}
export declare function getAppServer(client: Client, name: string): Promise<AppServerInfo>;
