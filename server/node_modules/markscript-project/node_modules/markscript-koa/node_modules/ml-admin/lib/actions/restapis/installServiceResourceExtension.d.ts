import { Client } from 'marklogic';
export interface MethodArgs {
    [arg: string]: string;
}
export interface Methods {
    GET?: MethodArgs;
    get?: MethodArgs;
    POST?: MethodArgs;
    post?: MethodArgs;
    PUT?: MethodArgs;
    put?: MethodArgs;
    DELETE?: MethodArgs;
    delete?: MethodArgs;
}
export interface ExtensionConfig {
    name: string;
    version?: string;
    description?: string;
    methods: Methods;
}
export declare function installServiceResourceExtension(client: Client, config: ExtensionConfig, code: string): Promise<any>;
