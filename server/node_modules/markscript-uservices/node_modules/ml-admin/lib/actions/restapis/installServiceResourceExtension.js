var rest_1 = require('../../utils/rest');
function installServiceResourceExtension(client, config, code) {
    var parameters = '?';
    if (config.version) {
        parameters += "&version=" + config.version;
    }
    if (config.description) {
        parameters += "&description=" + config.description;
    }
    return rest_1.basicRestCall(client, "/LATEST/config/resources/" + config.name, "installServiceResourceExtension/" + config.name, 'PUT', code, {
        'Content-type': 'application/vnd.marklogic-javascript'
    });
}
exports.installServiceResourceExtension = installServiceResourceExtension;
//# sourceMappingURL=installServiceResourceExtension.js.map