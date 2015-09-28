import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface MethodArgs {
  [arg: string]: string
}

export interface Methods {
  GET?: MethodArgs
  get?: MethodArgs
  POST?: MethodArgs
  post?: MethodArgs
  PUT?: MethodArgs
  put?: MethodArgs
  DELETE?: MethodArgs
  delete?: MethodArgs
}

export interface ExtensionConfig {
  name: string
  version?: string
  description?: string
  methods: Methods
}

export function installServiceResourceExtension(client: Client, config: ExtensionConfig, code: string): Promise<any> {
  let parameters = '?'
  if (config.version) {
    parameters += `&version=${config.version}`
  }
  if (config.description) {
    parameters += `&description=${config.description}`
  }

  // Object.keys(config.methods).forEach(function(method) {
  //   parameters += `&method=${method}`
  //   let args = config.methods[method]
  //   Object.keys(args).forEach(function(arg) {
  //     parameters += `&${method}:${arg}=${args[arg]}`
  //   })
  // })

  // if (parameters.length === 1) {
  //   parameters = ''
  // }

  return basicRestCall(client, `/LATEST/config/resources/${config.name}`, `installServiceResourceExtension/${config.name}`, 'PUT', code, {
    'Content-type': 'application/vnd.marklogic-javascript'
  })
}
