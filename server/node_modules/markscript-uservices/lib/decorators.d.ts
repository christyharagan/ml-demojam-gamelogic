export interface MethodOptions {
    method: METHOD;
}
export declare const enum METHOD {
    POST = 0,
    PUT = 1,
}
export interface EventOptions {
    states?: MarkScript.TRIGGER_STATE | MarkScript.TRIGGER_STATE[];
    scope?: string;
    depth?: number;
    commit?: MarkScript.TRIGGER_COMMIT;
}
export declare function mlService(name: string): <S>(target: S) => S;
export declare function mlMethod(options?: MethodOptions): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare function mlEvent(options: EventOptions): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
