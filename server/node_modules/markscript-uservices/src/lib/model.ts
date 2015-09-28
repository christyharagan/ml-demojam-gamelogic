import * as u from 'uservices'
import * as ms from 'markscript-core'

export interface MethodOptions {
  method: METHOD
}

export enum METHOD {
  POST, PUT
  // TODO: Support GET and DELETE
}

export function methodToString(method: METHOD) {
  switch (method) {
    case METHOD.PUT:
      return 'PUT'
    case METHOD.POST:
    default:
      return 'POST'
  }
}

export interface EventOptions {
  states?: ms.TRIGGER_STATE|ms.TRIGGER_STATE[]
  scope?: string
  depth?: number
  commit?: ms.TRIGGER_COMMIT
}

export interface MLServices extends u.Services<MLService> {
}

export interface MLService extends u.Service<MLMethod, MLEvent> {
  implementation?: {
    moduleName: string,
    className: string
  }
}

export interface MLMethod extends u.Method<MLService>, MethodOptions {
}

export interface MLEvent extends u.Event<MLService>, EventOptions {
}
