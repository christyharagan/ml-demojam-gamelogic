var rest_1 = require('../../utils/rest');
function getRole(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/roles/" + name + "?format=json", "getRole/" + name);
}
exports.getRole = getRole;
//# sourceMappingURL=getRole.js.map