import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteAppServer(client: Client, name: string, groupId: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/servers/${name}?format=json&group-id=${groupId}`, `deleteAppServer/${name}`, 'DELETE')
}
