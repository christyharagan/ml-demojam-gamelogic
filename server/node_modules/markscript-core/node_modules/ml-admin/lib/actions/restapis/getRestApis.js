var rest_1 = require('../../utils/rest');
function getRestApis(client, name) {
    return rest_1.basicRestCall(client, "/LATEST/rest-apis", "getRestApis");
}
exports.getRestApis = getRestApis;
//# sourceMappingURL=getRestApis.js.map