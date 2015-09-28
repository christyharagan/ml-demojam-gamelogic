var rest_1 = require('../../utils/rest');
var path = require('path');
function installModule(client, modulePath, moduleCode, format) {
    if (modulePath.indexOf('.sjs') !== modulePath.length - 4 && modulePath.indexOf('.xqy') !== modulePath.length - 4) {
        modulePath += '.sjs';
    }
    return rest_1.basicRestCall(client, path.posix.join('/v1/ext/', modulePath) + (format ? "?format=" + format : ''), "installModule/" + modulePath, 'PUT', moduleCode, { 'Content-Type': 'text/plain' });
}
exports.installModule = installModule;
//# sourceMappingURL=installModule.js.map