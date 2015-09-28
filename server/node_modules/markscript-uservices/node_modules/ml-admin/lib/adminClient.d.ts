import { Client } from 'marklogic';
export interface AdminConnectionParams {
    host?: string;
    port?: number;
    user?: string;
    password: string;
    authType?: string;
    ssl?: string;
    agent?: any;
    database?: string;
}
export declare function createAdminClient(connectionParams: AdminConnectionParams): Client;
