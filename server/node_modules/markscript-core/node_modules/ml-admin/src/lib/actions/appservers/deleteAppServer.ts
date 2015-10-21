import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function deleteAppServer(client: DatabaseClient, name: string, groupId: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/servers/${name}?format=json&group-id=${groupId}`, `deleteAppServer/${name}`, 'DELETE')
}
