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

export interface DatabasesInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getDatabases(client: Client, name: string): Promise<DatabasesInfo> {
  return <Promise<DatabasesInfo>> basicRestCall(client, `/manage/v2/databases?format=json`, `getDatabases`)
}