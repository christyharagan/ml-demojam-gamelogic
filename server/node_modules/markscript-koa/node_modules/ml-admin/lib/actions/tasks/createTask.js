var rest_1 = require('../../utils/rest');
function createTask(client, config, groupId) {
    return rest_1.basicRestCall(client, "/manage/v2/tasks?group-id=" + groupId, "createTask/" + config['task-path'], 'POST', config, {
        'Content-Type': 'application/json'
    });
}
exports.createTask = createTask;
//# sourceMappingURL=createTask.js.map