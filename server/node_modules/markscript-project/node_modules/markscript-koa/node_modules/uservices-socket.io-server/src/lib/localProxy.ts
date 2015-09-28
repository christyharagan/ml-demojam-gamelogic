import {visitService, Service} from 'uservices'
import {Observer, Observable} from 'rx'

export function createLocalProxy<T>(server: SocketIO.Server|SocketIO.Namespace, serviceSpec: Service<any, any>, service: T) {
  server.on('connection', function(socket) {
    visitService(serviceSpec, {
      onMethod: function(memberSchema) {
        let name = memberSchema.name
        let func = service[name]
        socket.on(serviceSpec.name + '/' + name, function(args: any[], cb: (value?: any, error?: any) => void) {
          (<Promise<any>>func.apply(service, args)).then(cb).catch(cb.bind(null, null))
        })
      },
      onEvent: function(memberSchema) {
        let name = serviceSpec.name + '/' + memberSchema.name
        let event = service[memberSchema.name]
        socket.on(name, function(args: any[], cb: (id: string) => void) {
          let id = String(Date.now())
          socket.once(name + id, function() {
            let observable = <Observable<any>>event.apply(service, args)
            observable.subscribe(
              function(value) {
                socket.emit(name + id, [value])
              },
              function(error) {
                socket.emit(name + id, [null, error])
              },
              function() {
                socket.emit(name + id)
              }
            )
          })
          cb(id)
        })
      }
    })
  })
}
