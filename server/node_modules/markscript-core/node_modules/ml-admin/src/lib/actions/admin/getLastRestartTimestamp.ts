import {basicRestCall} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export function getLastRestartTimestamp(client: DatabaseClient): Promise<Date> {
  return basicRestCall(client, '/admin/v1/timestamp', 'getLastRestartTimestamp').then(function(result) {
    return new Date(result)
  })
}
