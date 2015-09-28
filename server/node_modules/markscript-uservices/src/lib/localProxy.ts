// TODO
export const TODO_LOCAL_PROXY = 'TODO'
// import {visitSpec, Observable, Spec} from 'uservices'
// import {Client} from 'marklogic'
// import {createOperation, startRequest, Options} from 'marklogic/lib/mlrest'
// import * as s from 'typescript-schema'
// import {getMethodDetails, getEventDetails} from './utils'
// import * as path from 'path'
//
// // TODO: This is all hacked together
// export interface Server {
//   _post(path: string, ret:(...args:any[])=>any): void
// }
//
// export function createLocalProxy<T>(serviceSchema: s.Class, service:T, client: Client, server: Server) {
//   visitSpec({
//     onPromise(memberSchema:s.DecoratedMember<any>, functionT:s.FunctionType):void {
//       let name = memberSchema.name
//       let methodPath = path.posix.join(serviceSchema.typeConstructor.parent.name, serviceSchema.name, memberSchema.name).replace(/\//g, '-')
//       server._post('/' + methodPath, function(args:any[]){
//         return service[name].apply(service, args)
//       })
//     },
//     onObservable(memberSchema:s.DecoratedMember<any>) {
//       // TODO
//     }
//   }, serviceSchema)
// }
