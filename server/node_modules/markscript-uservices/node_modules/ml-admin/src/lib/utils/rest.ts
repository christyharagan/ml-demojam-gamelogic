import {Client} from 'marklogic'
import {Headers, Options, createOperation, startRequest} from 'marklogic/lib/mlrest'

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

export function basicRestCall(client: Client, endpoint: string, description: string, method: string = 'GET', body?: any, headers?: Headers): Promise<any> {
  let requestOptions: Options = {
    method: method,
    path: endpoint,
    headers: headers
  }

  Object.keys(client.connectionParams).forEach(function(key) {
    requestOptions[key] = client.connectionParams[key]
  })

  let operation = createOperation(description, client, requestOptions, 'single', 'single')
  if (body !== undefined) {
    operation.requestBody = body
  }

  return <Promise<string>>new Promise(function(resolve, reject) {
    startRequest(operation).result(resolve, reject)
  })
}
