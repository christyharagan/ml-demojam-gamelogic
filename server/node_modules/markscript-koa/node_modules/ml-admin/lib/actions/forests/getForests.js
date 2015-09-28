var rest_1 = require('../../utils/rest');
function getForests(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/forests?format=json", "getForests");
}
exports.getForests = getForests;
//# sourceMappingURL=getForests.js.map