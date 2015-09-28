import { Client } from 'marklogic';
import { Headers } from 'marklogic/lib/mlrest';
export declare function createUrl(path: string, parameters: Object): string;
export declare function basicRestCall(client: Client, endpoint: string, description: string, method?: string, body?: any, headers?: Headers): Promise<any>;
