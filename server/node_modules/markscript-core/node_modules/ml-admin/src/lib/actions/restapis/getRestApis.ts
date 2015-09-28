import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'
import {RestApisInfo} from './getRestApi'

export function getRestApis(client: Client, name: string): Promise<RestApisInfo> {
  return <Promise<RestApisInfo>> basicRestCall(client, `/LATEST/rest-apis`, `getRestApis`)
}