import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface Permission {
  'role-name': string
  capability: string
}

export interface PrivilegeConfiguration {
  'privilege-name': string
  action?: string
  kind?: string
  roles?: string[]
}

export function createPrivilege(client: DatabaseClient, config: PrivilegeConfiguration): Promise<any> {
  return basicRestCall(client, '/manage/v2/privileges', `createUser/${config['user-name']}`, 'POST', config)
}
