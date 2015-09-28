import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteDatabase(client: Client, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/databases/${name}?format=json`, `deleteDatabase/${name}`, 'DELETE', {
    'Content-Type': 'application/json'
  })
}
