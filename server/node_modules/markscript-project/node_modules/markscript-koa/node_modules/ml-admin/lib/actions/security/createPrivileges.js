var rest_1 = require('../../utils/rest');
function createPrivilege(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/privileges', "createUser/" + config['user-name'], 'POST', config);
}
exports.createPrivilege = createPrivilege;
//# sourceMappingURL=createPrivileges.js.map