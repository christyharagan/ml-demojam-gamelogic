import * as m from './model';
export interface ServicesVisitor<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>> {
    onService(service: S): void | ServiceVisitor<M, E>;
}
export interface ServiceVisitor<M extends m.Method<any>, E extends m.Event<any>> {
    onMethod?(method: M): void;
    onEvent?(event: E): void;
}
export declare function visitServices<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>>(services: m.Services<S>, visitor: ServicesVisitor<S, M, E>): void;
export declare function visitService<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>>(service: S, visitor: ServiceVisitor<M, E>): void;
