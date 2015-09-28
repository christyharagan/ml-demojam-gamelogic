import { Client } from 'marklogic';
export interface ForestConfiguration {
    'forest-name': string;
    host: string;
    database: string;
    'data-directory'?: string;
    'large-data-directory'?: string;
    'fast-data-directory'?: string;
}
export declare function createForest(client: Client, config: ForestConfiguration): Promise<any>;
