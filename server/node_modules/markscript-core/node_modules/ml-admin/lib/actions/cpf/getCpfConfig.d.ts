import { DatabaseClient } from 'marklogic';
export interface DocumentConfiguration {
    uri: string | string[];
    category?: string | string[];
    database?: string;
    format?: string;
}
export declare function getDocuments(client: DatabaseClient, config: DocumentConfiguration): Promise<any>;
