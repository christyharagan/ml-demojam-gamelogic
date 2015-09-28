var rest_1 = require('../../utils/rest');
function createAppServer(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/servers', "createAppServer/" + config['server-name'], 'POST', config, {
        'Content-Type': 'application/json'
    });
}
exports.createAppServer = createAppServer;
//# sourceMappingURL=createAppServer.js.map