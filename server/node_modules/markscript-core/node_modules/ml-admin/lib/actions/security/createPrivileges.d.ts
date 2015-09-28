import { Client } from 'marklogic';
export interface Permission {
    'role-name': string;
    capability: string;
}
export interface PrivilegeConfiguration {
    'privilege-name': string;
    action?: string;
    kind?: string;
    roles?: string[];
}
export declare function createPrivilege(client: Client, config: PrivilegeConfiguration): Promise<any>;
