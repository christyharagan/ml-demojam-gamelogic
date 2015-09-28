import * as m from './model'

export interface ServicesVisitor<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>> {
  onService(service: S): void|ServiceVisitor<M, E>
}

export interface ServiceVisitor<M extends m.Method<any>, E extends m.Event<any>> {
  onMethod?(method: M): void

  onEvent?(event: E): void
}

export function visitServices<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>>(services: m.Services<S>, visitor: ServicesVisitor<S, M, E>): void {
  Object.keys(services).forEach(function(name) {
    let service = services[name]
    let v = visitor.onService(service)
    if (v) {
      visitService(service, <ServiceVisitor<M, E>>v)
    }
  })
}

export function visitService<S extends m.Service<any, any>, M extends m.Method<any>, E extends m.Event<any>>(service: S, visitor: ServiceVisitor<M, E>): void {
  if (visitor.onMethod && service.methods) {
    Object.keys(service.methods).forEach(function(name) {
      let method = service.methods[name]
      visitor.onMethod(method)
    })
  }
  if (visitor.onEvent && service.events) {
    Object.keys(service.events).forEach(function(name) {
      let event = service.events[name]
      visitor.onEvent(event)
    })
  }
}
