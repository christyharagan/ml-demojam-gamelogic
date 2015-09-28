var rest_1 = require('../../utils/rest');
var path_1 = require('path');
function deleteModule(client, modulePath) {
    if (modulePath.indexOf('.sjs') !== modulePath.length - 4 && modulePath.indexOf('.xqy') !== modulePath.length - 4) {
        modulePath += '.sjs';
    }
    return rest_1.basicRestCall(client, path_1.posix.join('/v1/ext/', modulePath), "deleteModule/" + modulePath, 'DELETE');
}
exports.deleteModule = deleteModule;
//# sourceMappingURL=deleteModule.js.map