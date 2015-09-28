require('should');
require('should-promised');
var adminClient_1 = require('../../../lib/adminClient');
var getLastRestartTimestamp_1 = require('../../../lib/actions/admin/getLastRestartTimestamp');
describe('getLastRestartTimestamp', function () {
    it('should return a valid timestamp', function () {
        return returnAValidTimeStamp().should.finally.be.an.instanceof(Date);
    });
});
function returnAValidTimeStamp() {
    var connectionParams = {
        password: 'passw0rd'
    };
    var client = adminClient_1.createAdminClient(connectionParams);
    return getLastRestartTimestamp_1.getLastRestartTimestamp(client);
}
exports.returnAValidTimeStamp = returnAValidTimeStamp;
//# sourceMappingURL=getLastRestartTimestampTest.js.map