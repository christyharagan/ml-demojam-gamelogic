var rest_1 = require('../../utils/rest');
function getRoles(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/roles?format=json", "getRoles");
}
exports.getRoles = getRoles;
//# sourceMappingURL=getRoles.js.map