import { Client } from 'marklogic';
export interface DocumentConfiguration {
    uri: string | string;
    category?: string | string[];
    database?: string;
}
export declare function deleteDocuments(client: Client, config: DocumentConfiguration): Promise<any>;
