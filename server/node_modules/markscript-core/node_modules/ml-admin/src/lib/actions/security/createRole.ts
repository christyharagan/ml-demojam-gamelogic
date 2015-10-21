import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface Permission {
  'role-name': string
  capability: string
}

export interface Privilege {
  'privilege-name': string
  action?: string
  kind?: any
}

export interface RoleConfiguration {
  'role-name': string
  description?: string
  compartment?: string
  privileges?: Privilege[]
  roles?: string[]
  permissions?: Permission[]
  externalNames?: string[]
  collections?: string[]
}

export function createRole(client: DatabaseClient, config: RoleConfiguration): Promise<any> {
  return basicRestCall(client, '/manage/v2/roles', `createRole/${config['role-name']}`, 'POST', config)
}
