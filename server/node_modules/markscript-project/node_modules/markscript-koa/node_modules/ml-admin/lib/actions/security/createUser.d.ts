import { Client } from 'marklogic';
export interface Permission {
    'role-name': string;
    capability: string;
}
export interface UserConfiguration {
    'user-name': string;
    password: string;
    description?: string;
    roles?: string[];
    permissions?: Permission[];
    externalNames?: string[];
    collections?: string[];
}
export declare function createUser(client: Client, config: UserConfiguration): Promise<any>;
