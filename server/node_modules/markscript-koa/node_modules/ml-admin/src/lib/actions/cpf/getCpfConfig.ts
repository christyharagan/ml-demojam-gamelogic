import {basicRestCall, createUrl} from '../../utils/rest'
import {Client} from 'marklogic'

export interface DocumentConfiguration {
  uri: string|string[]
  category?: string|string[]
  database?: string
  format?: string

  // TODO finish this
}

export function getDocuments(client: Client, config: DocumentConfiguration): Promise<any> {
  return new Promise(function(resolve, reject) {
    client.eval(`declareUpdate();xdmp.documentGet('${config.uri}', content);`).result(resolve, reject)
  })
}
