var rest_1 = require('../../utils/rest');
function deleteForest(client, name, configOnly) {
    return rest_1.basicRestCall(client, "/manage/v2/forests/" + name + "?format=json&level=" + (configOnly ? 'config-only' : 'full'), "deleteForest/" + name, 'DELETE');
}
exports.deleteForest = deleteForest;
//# sourceMappingURL=deleteForest.js.map