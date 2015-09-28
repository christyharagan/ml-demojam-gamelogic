var rest_1 = require('../../utils/rest');
function getRole(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/privileges/" + name + "?format=json", "getPrivilege/" + name);
}
exports.getRole = getRole;
//# sourceMappingURL=getPrivilege.js.map