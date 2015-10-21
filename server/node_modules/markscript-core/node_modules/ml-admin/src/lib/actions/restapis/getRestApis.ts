import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'
import {RestApisInfo} from './getRestApi'

export function getRestApis(client: DatabaseClient, name: string): Promise<RestApisInfo> {
  return <Promise<RestApisInfo>> basicRestCall(client, `/LATEST/rest-apis`, `getRestApis`)
}
