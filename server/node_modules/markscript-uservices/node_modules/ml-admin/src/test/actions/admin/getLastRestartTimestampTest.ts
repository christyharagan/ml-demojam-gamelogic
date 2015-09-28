require('should')
require('should-promised')

import {createAdminClient, AdminConnectionParams} from '../../../lib/adminClient'
import {getLastRestartTimestamp} from '../../../lib/actions/admin/getLastRestartTimestamp'

describe('getLastRestartTimestamp', function() {
  it('should return a valid timestamp', function(){
    return returnAValidTimeStamp().should.finally.be.an.instanceof(Date)
  })
})

export function returnAValidTimeStamp() {
  let connectionParams: AdminConnectionParams = {
    password: 'passw0rd'
  }
  let client = createAdminClient(connectionParams)

  return getLastRestartTimestamp(client)
}
