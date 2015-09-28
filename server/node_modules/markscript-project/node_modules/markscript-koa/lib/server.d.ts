import * as mu from 'markscript-uservices';
export interface RunOptions {
    database: {
        databaseName: string;
        host: string;
        port: number;
        user: string;
        password: string;
    };
    middle: {
        host: string;
        port: number;
    };
    pkgDir?: string;
    serviceSpecs?: mu.MLServices;
    fileServerPath?: string;
}
export declare class Server {
    private options;
    private services;
    private httpServer;
    getService<T>(name: string): T;
    constructor(options: RunOptions);
    stop(): void;
    start(): Promise<Server>;
}
