import {basicRestCall, createUrl} from '../../utils/rest'
import {DatabaseClient} from 'marklogic'

export interface DocumentConfiguration {
  uri: string|string
  category?: string|string[]
  database?: string

  // TODO finish this
}

export function deleteDocuments(client: DatabaseClient, config: DocumentConfiguration): Promise<any> {
  return new Promise(function(resolve, reject) {
    client.eval(`declareUpdate();xdmp.documentDelete('${config.uri}', content);`).result(resolve, reject)
  })
//  return basicRestCall(client, createUrl('/v1/documents', config), `deleteDocuments/${config.uri}`, 'DELETE')
}
