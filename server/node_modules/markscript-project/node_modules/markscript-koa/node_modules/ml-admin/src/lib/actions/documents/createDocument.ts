import {basicRestCall, createUrl} from '../../utils/rest'
import {Client} from 'marklogic'

export interface DocumentConfiguration {
  uri: string
  category?: string|string[]
  database?: string
  format?: string
  collection?: string|string[]
  quality?: number

  // TODO finish this
}

export function createDocument(client: Client, config: DocumentConfiguration, content): Promise<any> {
  return new Promise(function(resolve, reject) {
    content = content.replace(/\\/g, '\\\\').replace(/\t/g, '  ').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\'/g, '\\\'')

    client.eval(`declareUpdate();
var textNode = new NodeBuilder();
textNode.addText('${content}');
textNode = textNode.toNode();
xdmp.documentInsert('${config.uri}', textNode);`).result(resolve, reject)
  })
}
