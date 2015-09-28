var rest_1 = require('../../utils/rest');
function getLastRestartTimestamp(client) {
    return rest_1.basicRestCall(client, '/admin/v1/timestamp', 'getLastRestartTimestamp').then(function (result) {
        return new Date(result);
    });
}
exports.getLastRestartTimestamp = getLastRestartTimestamp;
//# sourceMappingURL=getLastRestartTimestamp.js.map