import { DatabaseClient } from 'marklogic';
import { RestApisInfo } from './getRestApi';
export declare function getRestApis(client: DatabaseClient, name: string): Promise<RestApisInfo>;
