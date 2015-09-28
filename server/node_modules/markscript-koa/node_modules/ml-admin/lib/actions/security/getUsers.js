var rest_1 = require('../../utils/rest');
function getUsers(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/users?format=json", "getUsers");
}
exports.getUsers = getUsers;
//# sourceMappingURL=getUsers.js.map