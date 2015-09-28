import { reflective as s, KeyValue } from 'typescript-schema';
import * as m from './model';
import * as v from './specVisitor';
export declare function defaultIsService(decorator: s.Decorator<s.ClassConstructor>): boolean;
export declare function generateServiceSpecs<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>>(modules: KeyValue<s.Module>, isService?: (decorator: s.Decorator<s.ClassConstructor>) => boolean, onService?: (service: S, classConstructor: s.ClassConstructor) => void, onMethod?: (method: M, member: s.ClassConstructorMember) => M, onEvent?: (event: E, member: s.ClassConstructorMember) => E, visitor?: v.ServicesVisitor<S, M, E>): m.Services<S>;
export declare function generateServiceSpec<M extends m.Method<any>, E extends m.Event<any>>(name: string, classConstructor: s.ClassConstructor, onMethod?: (method: M, member: s.ClassConstructorMember) => M, onEvent?: (event: E, member: s.ClassConstructorMember) => E, service?: m.Service<M, E>): m.Service<M, E>;
