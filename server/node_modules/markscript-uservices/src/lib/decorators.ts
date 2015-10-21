export interface MethodOptions {
  method: METHOD
}

export const enum METHOD {
  POST, PUT
  // TODO: Support GET and DELETE
}

export interface EventOptions {
  states?: MarkScript.TRIGGER_STATE|MarkScript.TRIGGER_STATE[]
  scope?: string
  depth?: number
  commit?: MarkScript.TRIGGER_COMMIT
}

export function mlService(name: string) {
  return function <S>(target: S) {
    return target
  }
}

export function mlMethod(options?: MethodOptions) {
  return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  }
}

export function mlEvent(options: EventOptions) {
  return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  }
}
