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

export interface UsersInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getUsers(client: Client, name: string): Promise<UsersInfo> {
  return <Promise<UsersInfo>> basicRestCall(client, `/manage/v2/users?format=json`, `getUsers`)
}
