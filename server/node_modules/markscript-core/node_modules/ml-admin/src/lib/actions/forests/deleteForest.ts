import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deleteForest(client: DatabaseClient, name: string, configOnly?: boolean): Promise<any> {
  return basicRestCall(client, `/manage/v2/forests/${name}?format=json&level=${configOnly?'config-only':'full'}`, `deleteForest/${name}`, 'DELETE')
}
