import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface Meta {
  // TOOD
}

export interface Relations {
  // TOOD
}

export interface RelatedViews {
  // TOOD
}

export interface ListItems {
  // TODO
}

export interface AppServersInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getAppServers(client: Client, name: string): Promise<AppServersInfo> {
  return <Promise<AppServersInfo>> basicRestCall(client, `/manage/v2/servers?format=json`, `getAppServers`)
}
