import { Client } from 'marklogic';
export interface RestApiInfo {
    name: string;
    group: string;
    database: string;
    'modules-database': string;
    port: string;
}
export interface RestApisInfo {
    'rest-apis': RestApiInfo[];
}
export declare function getRestApi(client: Client, name: string): Promise<RestApisInfo>;
