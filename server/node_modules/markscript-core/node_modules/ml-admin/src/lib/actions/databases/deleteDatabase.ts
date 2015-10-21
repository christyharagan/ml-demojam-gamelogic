import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deleteDatabase(client: DatabaseClient, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/databases/${name}?format=json`, `deleteDatabase/${name}`, 'DELETE', {
    'Content-Type': 'application/json'
  })
}
