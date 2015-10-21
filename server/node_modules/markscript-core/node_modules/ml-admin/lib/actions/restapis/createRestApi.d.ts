import { DatabaseClient } from 'marklogic';
export interface RestApiConfiguration {
    name: string;
    group?: string;
    database?: string;
    'error-format'?: string;
    'forests-per-host'?: string;
    'modules-database'?: string;
    port?: number;
    'xdbc-enabled'?: boolean;
}
export declare function createRestApi(client: DatabaseClient, config: RestApiConfiguration): Promise<any>;
