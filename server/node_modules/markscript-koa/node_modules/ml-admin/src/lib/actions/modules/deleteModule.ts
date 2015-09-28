import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'
import {posix as path} from 'path'

export function deleteModule(client: Client, modulePath: string): Promise<any> {
  if (modulePath.indexOf('.sjs') !== modulePath.length - 4 && modulePath.indexOf('.xqy') !== modulePath.length - 4) {
    modulePath += '.sjs'
  }
  return basicRestCall(client, path.join('/v1/ext/', modulePath), `deleteModule/${modulePath}`, 'DELETE')
}