var rest_1 = require('../../utils/rest');
function getDatabase(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/databases/" + name + "?format=json", "getDatabase/" + name);
}
exports.getDatabase = getDatabase;
//# sourceMappingURL=getDatabase.js.map