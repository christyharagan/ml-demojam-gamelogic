var rest_1 = require('../../utils/rest');
function createForest(client, config) {
    return rest_1.basicRestCall(client, '/manage/v2/forests', "createForest/" + config['forest-name'], 'POST', config, {
        'Content-Type': 'application/json'
    });
}
exports.createForest = createForest;
//# sourceMappingURL=createForest.js.map