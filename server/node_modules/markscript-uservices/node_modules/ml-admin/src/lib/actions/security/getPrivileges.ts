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

export interface PrivilegesInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getRoles(client: Client, name: string): Promise<PrivilegesInfo> {
  return <Promise<PrivilegesInfo>>basicRestCall(client, `/manage/v2/privileges?format=json`, `getPrivileges`)
}
