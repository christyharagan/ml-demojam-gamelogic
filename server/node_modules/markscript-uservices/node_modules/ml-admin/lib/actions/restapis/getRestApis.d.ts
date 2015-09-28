import { Client } from 'marklogic';
import { RestApisInfo } from './getRestApi';
export declare function getRestApis(client: Client, name: string): Promise<RestApisInfo>;
