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

export interface UserInfo {
  id: string
  name: string
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
}

export function getUser(client: DatabaseClient, name: string): Promise<UserInfo> {
  return <Promise<UserInfo>>basicRestCall(client, `/manage/v2/users/${name}?format=json`, `getUser/${name}`)
}
