import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function deleteRestApi(client: Client, name: string, removeContent?: boolean, removeModules?: boolean): Promise<any> {
  let parameters = ''
  if (removeContent || removeModules) {
    parameters = '?'
    if (removeContent) {
      parameters += 'include=content'
    }
    if (removeModules) {
      parameters += '&include=modules'
    }
  }
  
  return basicRestCall(client, `/LATEST/rest-apis/${name}${parameters}`, `deleteRestApi/${name}`, 'DELETE')
}