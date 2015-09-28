var rest_1 = require('../../utils/rest');
function getForest(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/forests/" + name + "?format=json", "getForest/" + name);
}
exports.getForest = getForest;
//# sourceMappingURL=getForest.js.map