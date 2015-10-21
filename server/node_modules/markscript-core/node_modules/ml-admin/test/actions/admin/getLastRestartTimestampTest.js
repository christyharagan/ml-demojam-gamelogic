require('should');
require('should-promised');
var createTestClient_1 = require('../../createTestClient');
var getLastRestartTimestamp_1 = require('../../../lib/actions/admin/getLastRestartTimestamp');
describe('getLastRestartTimestamp', function () {
    it('should return a valid timestamp', function () {
        return returnAValidTimeStamp().should.finally.be.an.instanceof(Date);
    });
});
function returnAValidTimeStamp() {
    return getLastRestartTimestamp_1.getLastRestartTimestamp(createTestClient_1.createTestClient());
}
exports.returnAValidTimeStamp = returnAValidTimeStamp;
//# sourceMappingURL=getLastRestartTimestampTest.js.map