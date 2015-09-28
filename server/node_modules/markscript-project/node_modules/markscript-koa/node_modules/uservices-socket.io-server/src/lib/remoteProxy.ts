import {visitService, Service} from 'uservices'
import {Subject} from 'rx'

export function createRemoteProxy<T>(socket: SocketIO.Socket, serviceSpec: Service<any, any>) {
  let proxy: any = {}

  visitService(serviceSpec, {
    onMethod: function(memberSchema) {
      let name = memberSchema.name
      proxy[name] = function(...args: any[]) {
        return new Promise(function(resolve, reject) {
          socket.emit(name, args, function(value, error) {
            if (error) {
              reject(error)
            } else {
              resolve(value)
            }
          })
        })
      }
    },
    onEvent: function(memberSchema) {
      let name = memberSchema.name
      proxy[name] = function(...args: any[]) {
        let observer = new Subject()

        socket.emit(name, args, function(id: string) {
          socket.on(name + id, function([value, error, completed]) {
            if (completed) {
              observer.onCompleted()
            } else if (error) {
              observer.onError(error)
            } else {
              observer.onNext(value)
            }
          }).emit(name + id, true)
        })

        return observer
      }
    }
  })

  return proxy
}
