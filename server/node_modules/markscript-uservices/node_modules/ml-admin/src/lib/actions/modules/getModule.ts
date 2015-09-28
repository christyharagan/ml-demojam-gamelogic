import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'
import {posix as path} from 'path'

export function getModule(client: Client, modulePath: string): Promise<string> {
  if (modulePath.indexOf('.sjs') !== modulePath.length - 4 && modulePath.indexOf('.xqy') !== modulePath.length - 4) {
    modulePath += '.sjs'
  }
  return <Promise<string>> basicRestCall(client, path.join('/v1/ext/', modulePath), `getModule/${modulePath}`)
}