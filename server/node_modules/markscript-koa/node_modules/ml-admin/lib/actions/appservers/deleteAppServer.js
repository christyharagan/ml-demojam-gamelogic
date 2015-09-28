var rest_1 = require('../../utils/rest');
function deleteAppServer(client, name, groupId) {
    return rest_1.basicRestCall(client, "/manage/v2/servers/" + name + "?format=json&group-id=" + groupId, "deleteAppServer/" + name, 'DELETE');
}
exports.deleteAppServer = deleteAppServer;
//# sourceMappingURL=deleteAppServer.js.map