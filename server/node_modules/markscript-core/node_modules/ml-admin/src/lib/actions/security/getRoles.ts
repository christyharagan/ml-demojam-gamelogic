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

export interface ListItems {
  // TODO
}

export interface RolesInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getRoles(client: DatabaseClient, name: string): Promise<RolesInfo> {
  return <Promise<RolesInfo>>basicRestCall(client, `/manage/v2/roles?format=json`, `getRoles`)
}
