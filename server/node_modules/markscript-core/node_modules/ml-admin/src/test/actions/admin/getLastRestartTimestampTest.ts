require('should')
require('should-promised')

import {createTestClient} from '../../createTestClient'
import {getLastRestartTimestamp} from '../../../lib/actions/admin/getLastRestartTimestamp'

describe('getLastRestartTimestamp', function() {
  it('should return a valid timestamp', function(){
    return returnAValidTimeStamp().should.finally.be.an.instanceof(Date)
  })
})

export function returnAValidTimeStamp() {
  return getLastRestartTimestamp(createTestClient())
}
