import {DatabaseClient, operation} from 'marklogic'
import Operation = require('marklogic/lib/operation')
import {startRequest} from 'marklogic/lib/requester'

export function createUrl(path: string, parameters: Object): string {
  path += '?'
  Object.keys(parameters).forEach(function(name) {
    let value = parameters[name]
    if (Array.isArray(value)) {
      let array = <Array<any>>value
      array.forEach(function(value) {
        path += `&${name}=${value}`
      })
    } else {
      path += `&${name}=${value}`
    }
  })
  return path
}

export function basicRestCall(client: DatabaseClient, endpoint: string, description: string, method: string = 'GET', body?: any, headers?: {[header:string]:string}): Promise<any> {
  let requestOptions: operation.OperationOptions = {
    method: method,
    path: endpoint,
    headers: headers
  }

  Object.keys(client['connectionParams']).forEach(function(key) {
    requestOptions[key] = client['connectionParams'][key]
  })

  let operation = new Operation(description, client, requestOptions, 'single', 'single')
  if (body !== undefined) {
    operation.requestBody = body
  }

  return new Promise<string>(function(resolve, reject) {
    return startRequest(operation).result(resolve, reject)
  })
}
