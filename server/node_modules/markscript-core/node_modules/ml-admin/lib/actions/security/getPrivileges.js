var rest_1 = require('../../utils/rest');
function getRoles(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/privileges?format=json", "getPrivileges");
}
exports.getRoles = getRoles;
//# sourceMappingURL=getPrivileges.js.map