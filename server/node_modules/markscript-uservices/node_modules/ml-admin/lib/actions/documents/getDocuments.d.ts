import { Client } from 'marklogic';
export interface DocumentConfiguration {
    uri: string | string[];
    category?: string | string[];
    database?: string;
    format?: string;
}
export declare function getDocuments(client: Client, config: DocumentConfiguration): Promise<any>;
