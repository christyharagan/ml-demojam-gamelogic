require('should')
require('should-promised')

import {createAdminClient, AdminConnectionParams} from '../../../lib/adminClient'
import {getModule} from '../../../lib/actions/modules/getModule'
import {installModule} from '../../../lib/actions/modules/installModule'
import {deleteModule} from '../../../lib/actions/modules/deleteModule'
import {getAlert} from '../../../lib/actions/alerts/getAlert'
import {installAlert} from '../../../lib/actions/alerts/installAlert'
import {deleteAlert} from '../../../lib/actions/alerts/deleteAlert'
import {createDatabase} from '../../../lib/actions/databases/createDatabase'
import {getDatabase} from '../../../lib/actions/databases/getDatabase'
import {deleteDatabase} from '../../../lib/actions/databases/deleteDatabase'
import {createDocument} from '../../../lib/actions/documents/createDocument'
import {getDocuments} from '../../../lib/actions/documents/getDocuments'
import {deleteDocuments} from '../../../lib/actions/documents/deleteDocuments'

const TEST_DOC_1 = '/triggering/testDoc.json'
const TEST_DOC_2 = 'generatedDoc2.json'
const TEST_ALERT = 'testAlert'
const TEST_DATABASE = 'testDatabase'
const CREATE_TEST_DOC = 'testModules/createTestDoc'
const testModule = `
module.exports = function(uri, content) {
  declareUpdate();
  xdmp.documentInsert(uri.toString().trim(), content);
  //xdmp.documentInsert('${TEST_DOC_2}', content);
}`

describe('install and delete an alert', function() {
 it('should create a new alert which creates a document, and then should the alert should be deleted', function(){
   return createANewAleart().should.be.fulfilled
 })
})

export function createANewAleart() {
  let adminClient = createAdminClient({
   password: 'passw0rd'
  })
  let clientClient = createAdminClient({
    password: 'passw0rd',
    port: 8000
  })

  return getModule(clientClient, CREATE_TEST_DOC).then(function() {
    throw 'Test Module should not exist before calling tests'
  }).catch(function(){
    return getDocuments(clientClient, {uri: TEST_DOC_1})
  }).then(function(){
    throw 'Test Document should not exist before calling tests'
  }).catch(function(){
    return getDocuments(clientClient, {uri: TEST_DOC_2})
  }).then(function(){
    throw 'Test Document should not exist before calling tests'
  }).catch(function() {
    return getAlert(clientClient, TEST_ALERT)
  }).then(function(){
    throw 'Test Alert should not exist before calling tests'
  }).catch(function(){
    return installModule(clientClient, CREATE_TEST_DOC, testModule, 'text')
  }).then(function() {
    return installAlert(clientClient, {
      alertUri: TEST_ALERT,
      alertName: TEST_ALERT,
      actionName: CREATE_TEST_DOC,
      actionModule: '/ext/' + CREATE_TEST_DOC + '.sjs',
      triggerScope: '/triggering/'
    })
  }).then(function(){
    return new Promise(function(resolve, reject){
      clientClient.eval(`declareUpdate();xdmp.documentInsert('${TEST_DOC_1}', {Hello: 'World'});`).result(resolve).catch(reject)
    })
  }).then(function(){
    return getDocuments(clientClient, {uri: TEST_DOC_1})
  }).then(function(doc){
    doc.should.equal('Hello World')

    return getDocuments(clientClient, {uri: TEST_DOC_2})
  }).then(function(doc){
    doc.should.equal('Hello World')
  })
}
