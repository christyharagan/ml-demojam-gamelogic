var rest_1 = require('../../utils/rest');
function createDatabase(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/databases', "createDatabase/" + config['database-name'], 'POST', config, {
        'Content-Type': 'application/json'
    });
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=createDatabase.js.map