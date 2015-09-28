var rest_1 = require('../../utils/rest');
function createRestApi(client, config) {
    return rest_1.basicRestCall(client, '/LATEST/rest-apis', "createRestApi/" + config.name, 'POST', config);
}
exports.createRestApi = createRestApi;
//# sourceMappingURL=createRestApi.js.map