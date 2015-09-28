var rest_1 = require('../../utils/rest');
var ClearDatabaseOperation = (function () {
    function ClearDatabaseOperation() {
        this.operation = 'clear-database';
    }
    return ClearDatabaseOperation;
})();
exports.ClearDatabaseOperation = ClearDatabaseOperation;
function clearOrConfigureDatabase(client, databaseName, operation) {
    return rest_1.basicRestCall(client, "/manage/v2/databases/" + databaseName, "clearOrConfigureDatabase/" + databaseName, 'POST', operation, {
        'Content-Type': 'application/json'
    });
}
exports.clearOrConfigureDatabase = clearOrConfigureDatabase;
//# sourceMappingURL=clearOrConfigureDatabase.js.map