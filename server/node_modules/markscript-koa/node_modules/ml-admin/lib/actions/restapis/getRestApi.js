var rest_1 = require('../../utils/rest');
function getRestApi(client, name) {
    return rest_1.basicRestCall(client, "/LATEST/rest-apis/" + name, "getRestApi/" + name);
}
exports.getRestApi = getRestApi;
//# sourceMappingURL=getRestApi.js.map