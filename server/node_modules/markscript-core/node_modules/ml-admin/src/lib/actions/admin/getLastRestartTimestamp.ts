import {basicRestCall} from '../../utils/rest'
import {Client} from 'marklogic'

export function getLastRestartTimestamp(client: Client): Promise<Date> {
  return basicRestCall(client, '/admin/v1/timestamp', 'getLastRestartTimestamp').then(function(result) {
    return new Date(result)
  })
}
