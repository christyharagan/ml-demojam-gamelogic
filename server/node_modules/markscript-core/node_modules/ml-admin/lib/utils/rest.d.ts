import { DatabaseClient } from 'marklogic';
export declare function createUrl(path: string, parameters: Object): string;
export declare function basicRestCall(client: DatabaseClient, endpoint: string, description: string, method?: string, body?: any, headers?: {
    [header: string]: string;
}): Promise<any>;
