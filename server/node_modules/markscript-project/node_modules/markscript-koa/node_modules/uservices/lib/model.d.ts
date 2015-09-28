import { reflective as s } from 'typescript-schema';
export interface Method<S extends Service<any, any>> {
    name: string;
    service: S;
    type?: s.FunctionType;
}
export interface Event<S extends Service<any, any>> {
    name: string;
    service: S;
    type?: s.FunctionType;
}
export interface Service<M extends Method<any>, E extends Event<any>> {
    name: string;
    type?: s.InterfaceConstructor | s.ClassConstructor | s.Interface | s.Class;
    methods?: {
        [name: string]: M;
    };
    events?: {
        [name: string]: E;
    };
}
export interface Services<S extends Service<any, any>> {
    [name: string]: S;
}
