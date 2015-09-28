var rest_1 = require('../../utils/rest');
function deleteDatabase(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/databases/" + name + "?format=json", "deleteDatabase/" + name, 'DELETE', {
        'Content-Type': 'application/json'
    });
}
exports.deleteDatabase = deleteDatabase;
//# sourceMappingURL=deleteDatabase.js.map