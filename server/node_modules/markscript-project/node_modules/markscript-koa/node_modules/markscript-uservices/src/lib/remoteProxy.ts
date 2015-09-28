import {Client} from 'marklogic'
import * as u from 'uservices'
import * as m from './model'
import {createOperation, startRequest, Options} from 'marklogic/lib/mlrest'

export interface Server {
  get(path: string): u.Observable<any>

  post(path: string): u.Observable<any>

  put(path: string): u.Observable<any>

  del(path: string): u.Observable<any>
}

export function createRemoteProxy<T>(service: m.MLService, client: Client, server: Server): T {
  let proxy: any = {}
  u.visitService(service, {
    onMethod: function(method) {
      proxy[method.name] = function(...args: any[]) {
        let options: Options = {
          method: m.methodToString((<m.MLMethod>method).method),
          path: '/v1/resources/' + service.name + '-' + method.name,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        Object.keys(client.connectionParams).forEach(function(key) {
          options[key] = client.connectionParams[key]
        })
        let operation = createOperation(service.name + '-' + method.name, client, options, 'single', 'single')

        operation.requestBody = JSON.stringify(args)

        return <Promise<string>>new Promise(function(resolve, reject) {
          startRequest(operation).result(function(value) {
            if (Array.isArray(value)) {
              resolve(value.map(function(v) {
                return v.content
              }))
            } else {
              resolve(value)
            }
          }).catch(function(e) {
            console.log(e.stack)
            reject(e)
          })
        })
      }
    },
    onEvent: function(event) {
      let observable = server.post('/' + service.name + '-' + event.name).map(function(value) {
        if (value.value) {
          return value.value
        } else {
          throw value.error
        }
      })
      proxy[event.name] = function() {
        return observable
      }
    }
  })
  return <T>proxy
}
