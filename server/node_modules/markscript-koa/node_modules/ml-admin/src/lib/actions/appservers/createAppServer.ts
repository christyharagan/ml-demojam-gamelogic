import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface AppServerConfiguration {
  'server-name': string
  'server-type': string
  'modules-database': string
  root: string
  'group-name'?: string
  port?: number
  'content-database': string
  enabled?: boolean
  'log-errors'?: boolean
  'default-error-format'?: string
  'error-handler'?: string
  'url-rewriter'?: string
  'rewrite-resolves-globally'?: boolean

  // TODO finish this
}

export function createAppServer(client:Client, config:AppServerConfiguration):Promise<any> {
  return basicRestCall(client, '/manage/v2/servers', `createAppServer/${config['server-name']}`, 'POST', config, {
    'Content-Type': 'application/json'
  })
}
