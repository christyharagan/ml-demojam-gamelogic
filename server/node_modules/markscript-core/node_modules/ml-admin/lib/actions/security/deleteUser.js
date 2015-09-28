var rest_1 = require('../../utils/rest');
function deleteUser(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/users/" + name + "?format=json", "deleteUser/" + name, 'DELETE');
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map