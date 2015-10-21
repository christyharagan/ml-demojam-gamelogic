import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deleteRole(client: DatabaseClient, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/roles/${name}?format=json`, `deleteRole/${name}`, 'DELETE')
}
