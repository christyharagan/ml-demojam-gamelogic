var rest_1 = require('../../utils/rest');
function getAppServer(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/servers/" + name + "?format=json", "getAppServer/" + name);
}
exports.getAppServer = getAppServer;
//# sourceMappingURL=getAppServer.js.map