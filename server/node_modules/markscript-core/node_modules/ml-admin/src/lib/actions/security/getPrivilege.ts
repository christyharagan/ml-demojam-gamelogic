import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface Meta {
  // TOOD
}

export interface Relations {
  // TOOD
}

export interface RelatedViews {
  // TOOD
}

export interface PrivilegeInfo {
  id: string
  name: string
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
}

export function getRole(client: DatabaseClient, name: string): Promise<PrivilegeInfo> {
  return <Promise<PrivilegeInfo>>basicRestCall(client, `/manage/v2/privileges/${name}?format=json`, `getPrivilege/${name}`)
}
