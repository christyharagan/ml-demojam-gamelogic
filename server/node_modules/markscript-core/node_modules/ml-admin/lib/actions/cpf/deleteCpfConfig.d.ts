import { DatabaseClient } from 'marklogic';
export interface DocumentConfiguration {
    uri: string | string;
    category?: string | string[];
    database?: string;
}
export declare function deleteDocuments(client: DatabaseClient, config: DocumentConfiguration): Promise<any>;
