import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'
import {posix as path} from 'path'

export interface Assets {
  assets: Asset[]
}

export interface Asset {
  asset: string
}

export function getModules(client: Client, moduleDir: string): Promise<Assets> {
  return <Promise<Assets>> basicRestCall(client, path.join('/v1/ext/', moduleDir), `getModules/${moduleDir}`)
}