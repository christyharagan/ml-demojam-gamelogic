import { Client } from 'marklogic';
export interface DatabaseOperation {
    operation: string;
}
export declare class ClearDatabaseOperation implements DatabaseOperation {
    operation: string;
}
export declare function clearOrConfigureDatabase(client: Client, databaseName: string, operation: DatabaseOperation): Promise<any>;
