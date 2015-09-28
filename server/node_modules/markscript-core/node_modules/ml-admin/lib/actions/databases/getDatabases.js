var rest_1 = require('../../utils/rest');
function getDatabases(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/databases?format=json", "getDatabases");
}
exports.getDatabases = getDatabases;
//# sourceMappingURL=getDatabases.js.map