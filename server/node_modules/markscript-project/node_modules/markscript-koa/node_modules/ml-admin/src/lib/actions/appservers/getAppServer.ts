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

export interface AppServerInfo {
  id: string
  name: string
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
}

export function getAppServer(client: Client, name: string): Promise<AppServerInfo> {
  return <Promise<AppServerInfo>> basicRestCall(client, `/manage/v2/servers/${name}?format=json`, `getAppServer/${name}`)
}
