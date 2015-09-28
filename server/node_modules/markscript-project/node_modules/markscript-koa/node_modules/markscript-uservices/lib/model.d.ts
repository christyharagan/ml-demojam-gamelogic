import * as u from 'uservices';
import * as ms from 'markscript-core';
export interface MethodOptions {
    method: METHOD;
}
export declare enum METHOD {
    POST = 0,
    PUT = 1,
}
export declare function methodToString(method: METHOD): string;
export interface EventOptions {
    states?: ms.TRIGGER_STATE | ms.TRIGGER_STATE[];
    scope?: string;
    depth?: number;
    commit?: ms.TRIGGER_COMMIT;
}
export interface MLServices extends u.Services<MLService> {
}
export interface MLService extends u.Service<MLMethod, MLEvent> {
    implementation?: {
        moduleName: string;
        className: string;
    };
}
export interface MLMethod extends u.Method<MLService>, MethodOptions {
}
export interface MLEvent extends u.Event<MLService>, EventOptions {
}
