var rest_1 = require('../../utils/rest');
var path_1 = require('path');
function getModules(client, moduleDir) {
    return rest_1.basicRestCall(client, path_1.posix.join('/v1/ext/', moduleDir), "getModules/" + moduleDir);
}
exports.getModules = getModules;
//# sourceMappingURL=getModules.js.map