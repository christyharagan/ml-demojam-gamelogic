import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface DatabaseOperation {
  operation:string
}

export class ClearDatabaseOperation implements DatabaseOperation {
  operation = 'clear-database'
}

// TODO: Finish operations

export function clearOrConfigureDatabase(client:DatabaseClient, databaseName:string, operation:DatabaseOperation):Promise<any> {
  return basicRestCall(client, `/manage/v2/databases/${databaseName}`, `clearOrConfigureDatabase/${databaseName}`, 'POST', operation, {
    'Content-Type': 'application/json'
  })
}
