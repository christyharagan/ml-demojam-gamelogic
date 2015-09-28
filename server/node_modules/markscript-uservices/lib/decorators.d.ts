import * as m from './model';
export declare function mlService(name: string): <S>(target: S) => S;
export declare function mlMethod(options?: m.MethodOptions): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare function mlEvent(options: m.EventOptions): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
