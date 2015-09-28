import { Client } from 'marklogic';
export interface Assets {
    assets: Asset[];
}
export interface Asset {
    asset: string;
}
export declare function getModules(client: Client, moduleDir: string): Promise<Assets>;
