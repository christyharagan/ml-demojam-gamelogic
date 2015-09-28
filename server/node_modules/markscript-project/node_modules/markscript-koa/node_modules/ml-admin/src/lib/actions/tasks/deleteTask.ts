import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteTask(client: Client, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/tasks/${name}?format=json`, `deleteTask/${name}`, 'DELETE', {
    'Content-Type': 'application/json'
  })
}
