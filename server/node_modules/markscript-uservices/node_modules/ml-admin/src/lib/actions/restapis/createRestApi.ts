import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface RestApiConfiguration {
  name: string
  group?: string
  database?: string
  'error-format'?: string
  'forests-per-host'?: string
  'modules-database'?: string
  port?: number
  'xdbc-enabled'? : boolean
}

export function createRestApi(client:Client, config:RestApiConfiguration):Promise<any> {
  return basicRestCall(client, '/LATEST/rest-apis', `createRestApi/${config.name}`, 'POST', config)
}