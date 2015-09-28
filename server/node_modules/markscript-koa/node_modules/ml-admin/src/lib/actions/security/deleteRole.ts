import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteRole(client: Client, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/roles/${name}?format=json`, `deleteRole/${name}`, 'DELETE')
}
