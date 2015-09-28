require('should')
require('should-promised')

import {createAdminClient, AdminConnectionParams} from '../../../lib/adminClient'
import {createDatabase} from '../../../lib/actions/databases/createDatabase'
import {getDatabase} from '../../../lib/actions/databases/getDatabase'
import {deleteDatabase} from '../../../lib/actions/databases/deleteDatabase'

const TEST_DATABASE = 'testDatabase'

describe('create, get, and delete database', function() {
  it('should create a new database and then delete it', function(){
    createANewDatabase().should.be.fulfilled
  })
})

export function createANewDatabase() {
  let connectionParams: AdminConnectionParams = {
    password: 'passw0rd'
  }
  let client = createAdminClient(connectionParams)

  return getDatabase(client, TEST_DATABASE).then(function() {
    throw 'Test Database should not exist before calling tests'
  }).catch(function() {
    return createDatabase(client, { 'database-name': TEST_DATABASE })
  }).then(function() {
    return getDatabase(client, TEST_DATABASE)
  }).then(function() {
    return deleteDatabase(client, TEST_DATABASE)
  }).then(function() {
    return getDatabase(client, TEST_DATABASE)
  }).then(function() {
    throw 'Test Database should not exist after the tests'
  }).catch(function() {
    return Promise.resolve()
  })
}
