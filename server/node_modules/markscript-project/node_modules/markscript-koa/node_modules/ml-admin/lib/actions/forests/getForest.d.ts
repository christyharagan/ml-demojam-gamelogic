import { Client } from 'marklogic';
export interface Meta {
}
export interface Relations {
}
export interface RelatedViews {
}
export interface ForestInfo {
    id: string;
    name: string;
    meta: Meta;
    relations: Relations;
    'related-views': RelatedViews;
}
export declare function getForest(client: Client, name: string): Promise<ForestInfo>;
