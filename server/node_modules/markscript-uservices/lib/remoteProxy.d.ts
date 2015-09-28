import { Client } from 'marklogic';
import * as u from 'uservices';
import * as m from './model';
export interface Server {
    get(path: string): u.Observable<any>;
    post(path: string): u.Observable<any>;
    put(path: string): u.Observable<any>;
    del(path: string): u.Observable<any>;
}
export declare function createRemoteProxy<T>(service: m.MLService, client: Client, server: Server): T;
