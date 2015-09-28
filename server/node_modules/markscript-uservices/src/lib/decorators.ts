import * as m from './model'

export function mlService(name: string) {
  return function <S>(target: S) {
    return target
  }
}

export function mlMethod(options?: m.MethodOptions) {
  return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  }
}

export function mlEvent(options: m.EventOptions) {
  return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  }
}
