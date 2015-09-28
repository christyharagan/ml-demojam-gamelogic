var rest_1 = require('../../utils/rest');
function getAppServers(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/servers?format=json", "getAppServers");
}
exports.getAppServers = getAppServers;
//# sourceMappingURL=getAppServers.js.map