var rest_1 = require('../../utils/rest');
function deleteRestApi(client, name, removeContent, removeModules) {
    var parameters = '';
    if (removeContent || removeModules) {
        parameters = '?';
        if (removeContent) {
            parameters += 'include=content';
        }
        if (removeModules) {
            parameters += '&include=modules';
        }
    }
    return rest_1.basicRestCall(client, "/LATEST/rest-apis/" + name + parameters, "deleteRestApi/" + name, 'DELETE');
}
exports.deleteRestApi = deleteRestApi;
//# sourceMappingURL=deleteRestApi.js.map