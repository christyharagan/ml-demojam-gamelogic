var rest_1 = require('../../utils/rest');
function deleteRole(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/roles/" + name + "?format=json", "deleteRole/" + name, 'DELETE');
}
exports.deleteRole = deleteRole;
//# sourceMappingURL=deleteRole.js.map