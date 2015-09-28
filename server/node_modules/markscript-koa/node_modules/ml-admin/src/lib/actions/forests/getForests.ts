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

export interface ForestsInfo {
  meta: Meta
  relations: Relations
  'related-views': RelatedViews
  'list-items': ListItems
}

export function getForests(client: Client, name: string): Promise<ForestsInfo> {
  return <Promise<ForestsInfo>> basicRestCall(client, `/manage/v2/forests?format=json`, `getForests`)
}