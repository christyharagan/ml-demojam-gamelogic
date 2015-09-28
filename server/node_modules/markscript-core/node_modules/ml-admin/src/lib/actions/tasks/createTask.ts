import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export interface TaskConfiguration {
  'task-enabled'?: boolean
  'task-path': string
  'task-root': string
  'task-type': string
  'task-period': number
  'task-start-date'?: string
  'task-start-time'?: string
  'task-timestamp'?: string
  'task-database': string
  'task-modules': string
  'task-user': string
  // TODO finish this
}

export function createTask(client: Client, config: TaskConfiguration, groupId: string): Promise<any> {
  return basicRestCall(client, `/manage/v2/tasks?group-id=${groupId}`, `createTask/${config['task-path']}`, 'POST', config, {
    'Content-Type': 'application/json'
  })
}
