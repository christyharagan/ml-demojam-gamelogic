import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'
import * as path from 'path'

export function installModule(client: Client, modulePath: string, moduleCode: string, format?: string): Promise<any> {
  if (modulePath.indexOf('.sjs') !== modulePath.length - 4 && modulePath.indexOf('.xqy') !== modulePath.length - 4) {
    modulePath += '.sjs'
  }
  return basicRestCall(client, path.posix.join('/v1/ext/', modulePath) + (format ? `?format=${format}` : ''), `installModule/${modulePath}`, 'PUT', moduleCode, { 'Content-Type': 'text/plain' })
}