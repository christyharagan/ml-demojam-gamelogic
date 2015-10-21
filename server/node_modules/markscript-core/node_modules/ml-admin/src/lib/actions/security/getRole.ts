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

export interface RoleInfo {
  id: string
  name: string
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
}

export function getRole(client: DatabaseClient, name: string): Promise<RoleInfo> {
  return <Promise<RoleInfo>>basicRestCall(client, `/manage/v2/roles/${name}?format=json`, `getRole/${name}`)
}
