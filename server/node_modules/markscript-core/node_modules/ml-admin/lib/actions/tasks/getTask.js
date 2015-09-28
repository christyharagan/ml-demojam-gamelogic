var rest_1 = require('../../utils/rest');
function getTask(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/tasks/" + name + "?format=json", "getTask/" + name);
}
exports.getTask = getTask;
//# sourceMappingURL=getTask.js.map