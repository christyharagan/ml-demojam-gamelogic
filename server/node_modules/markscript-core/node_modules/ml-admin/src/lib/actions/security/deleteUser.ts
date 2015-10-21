import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deleteUser(client: DatabaseClient, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/users/${name}?format=json`, `deleteUser/${name}`, 'DELETE')
}
