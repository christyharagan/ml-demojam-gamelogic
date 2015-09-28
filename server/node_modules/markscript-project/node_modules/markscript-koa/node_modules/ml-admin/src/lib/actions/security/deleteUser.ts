import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteUser(client: Client, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/users/${name}?format=json`, `deleteUser/${name}`, 'DELETE')
}
