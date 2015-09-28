var rest_1 = require('../../utils/rest');
function deleteTask(client, name) {
    return rest_1.basicRestCall(client, "/manage/v2/tasks/" + name + "?format=json", "deleteTask/" + name, 'DELETE', {
        'Content-Type': 'application/json'
    });
}
exports.deleteTask = deleteTask;
//# sourceMappingURL=deleteTask.js.map