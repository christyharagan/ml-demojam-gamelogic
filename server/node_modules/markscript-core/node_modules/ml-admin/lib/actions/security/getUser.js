var rest_1 = require('../../utils/rest');
function getUser(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/users/" + name + "?format=json", "getUser/" + name);
}
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map