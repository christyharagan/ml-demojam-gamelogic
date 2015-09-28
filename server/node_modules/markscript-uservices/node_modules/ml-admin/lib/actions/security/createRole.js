var rest_1 = require('../../utils/rest');
function createRole(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/roles', "createRole/" + config['role-name'], 'POST', config);
}
exports.createRole = createRole;
//# sourceMappingURL=createRole.js.map