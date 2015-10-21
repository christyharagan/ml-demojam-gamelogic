import * as mu from 'markscript-uservices-build';
import * as b from 'markscript-basic-build';
export interface KoaBuildConfig {
    fileServerPath?: string;
}
export declare class Server extends b.Runtime implements mu.UServicesRuntime {
    buildModel: MarkScript.BuildModel & mu.UServicesBuildModel;
    buildConfig: MarkScript.BuildConfig & mu.UServicesBuildConfig & KoaBuildConfig;
    private services;
    private httpServer;
    getService<T>(name: string): T;
    constructor(buildModel: MarkScript.BuildModel & mu.UServicesBuildModel, buildConfig: MarkScript.BuildConfig & mu.UServicesBuildConfig & KoaBuildConfig);
    stop(): void;
    start(): Promise<Server>;
}
