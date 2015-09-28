var rest_1 = require('../../utils/rest');
function deletePrivilege(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/privileges/" + name + "?format=json", "deletePrivilege/" + name, 'DELETE');
}
exports.deletePrivilege = deletePrivilege;
//# sourceMappingURL=deletePrivileges.js.map