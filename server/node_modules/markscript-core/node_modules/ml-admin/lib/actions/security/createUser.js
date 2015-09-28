var rest_1 = require('../../utils/rest');
function createUser(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/users', "createUser/" + config['user-name'], 'POST', config);
}
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map