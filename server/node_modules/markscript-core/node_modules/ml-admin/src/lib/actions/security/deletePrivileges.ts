import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deletePrivilege(client: DatabaseClient, name: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/privileges/${name}?format=json`, `deletePrivilege/${name}`, 'DELETE')
}
