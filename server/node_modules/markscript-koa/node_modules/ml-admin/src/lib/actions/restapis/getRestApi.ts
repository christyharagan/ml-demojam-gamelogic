import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface RestApiInfo {
  name: string
  group: string
  database: string
  'modules-database': string
  port: string
}

export interface RestApisInfo {
  'rest-apis': RestApiInfo[]
}

export function getRestApi(client: Client, name: string): Promise<RestApisInfo> {
  return <Promise<RestApisInfo>> basicRestCall(client, `/LATEST/rest-apis/${name}`, `getRestApi/${name}`)
}