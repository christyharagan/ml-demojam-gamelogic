import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface Permission {
  'role-name': string
  capability: string
}

export interface UserConfiguration {
  'user-name': string
  password: string
  description?: string
  roles?: string[]
  permissions?: Permission[]
  externalNames?: string[]
  collections?: string[]
}

export function createUser(client: DatabaseClient, config: UserConfiguration): Promise<any> {
  return basicRestCall(client, '/manage/v2/users', `createUser/${config['user-name']}`, 'POST', config)
}
