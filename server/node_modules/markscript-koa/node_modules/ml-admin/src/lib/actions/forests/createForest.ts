import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface ForestConfiguration {
  'forest-name': string
  host: string
  database: string
  'data-directory'?: string
  'large-data-directory'?: string
  'fast-data-directory'?: string

  // TODO finish this
}

export function createForest(client:Client, config:ForestConfiguration):Promise<any> {
  return basicRestCall(client, '/manage/v2/forests', `createForest/${config['forest-name']}`, 'POST', config, {
    'Content-Type': 'application/json'
  })
}
