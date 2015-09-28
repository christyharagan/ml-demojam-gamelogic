import { Client } from 'marklogic';
export interface DocumentConfiguration {
    uri: string;
    category?: string | string[];
    database?: string;
    format?: string;
    collection?: string | string[];
    quality?: number;
}
export declare function createDocument(client: Client, config: DocumentConfiguration, content: any): Promise<any>;
