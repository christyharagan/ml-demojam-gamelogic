require('should')
require('should-promised')

import {createAdminClient, AdminConnectionParams} from '../../../lib/adminClient'
import {createRestApi} from '../../../lib/actions/restapis/createRestApi'
import {getRestApi} from '../../../lib/actions/restapis/getRestApi'
import {deleteRestApi} from '../../../lib/actions/restapis/deleteRestApi'
import {installServiceResourceExtension} from '../../../lib/actions/restapis/installServiceResourceExtension'
import {basicRestCall} from '../../../lib/utils/rest'

const TEST_REST_API = 'testRestApi'
const TEST_DATABASE = 'testContentDatabase'
const TEST_MODULES = 'testModulesDatabase'

function get(context, params) {
  return "Hello " + params.msg
}
const code: string = String(get)

describe('deploy and undeploy rest extension', function() {
  it('should create a new rest api, deploy a resource extension, then remove the rest api', function(){
    deployRestExtension().should.be.fulfilled
  })
})

export function deployRestExtension() {
  let connectionParams: AdminConnectionParams = {
    password: 'passw0rd'
  }
  let client = createAdminClient(connectionParams)

  return getRestApi(client, TEST_REST_API).then(function() {
    throw 'Test REST API should not exist before calling tests'
  }).catch(function() {
    return createRestApi(client, {
      name: TEST_REST_API,
      database: TEST_DATABASE,
      'modules-database': TEST_MODULES,
      port: 8099
    })
  }).then(function() {
    return getRestApi(client, TEST_REST_API)
  }).then(function() {
    return installServiceResourceExtension(client, {
      name: 'hello',
      methods: {
        GET: {
          msg: "string"
        }
      }
    }, code)
  }).then(function() {
    return basicRestCall(client, '/LATEST/resources/hello?msg="world"', 'testRestApi')
  }).then(function(msg: string) {
    // TODO: Eek, we need to consider the case where we fail here and thus don't get to delete the rest api
    msg.should.equal('Hello world')

    return deleteRestApi(client, 'hello', true, true)
  }).then(function() {
    return getRestApi(client, TEST_REST_API)
  }).then(function() {
    throw 'Test REST API should not exist after the tests'
  }).catch(function() {
    return Promise.resolve()
  })
}
