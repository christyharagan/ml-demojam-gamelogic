require('should');
require('should-promised');
var adminClient_1 = require('../../../lib/adminClient');
var createDatabase_1 = require('../../../lib/actions/databases/createDatabase');
var getDatabase_1 = require('../../../lib/actions/databases/getDatabase');
var deleteDatabase_1 = require('../../../lib/actions/databases/deleteDatabase');
var TEST_DATABASE = 'testDatabase';
describe('create, get, and delete database', function () {
    it('should create a new database and then delete it', function () {
        createANewDatabase().should.be.fulfilled;
    });
});
function createANewDatabase() {
    var connectionParams = {
        password: 'passw0rd'
    };
    var client = adminClient_1.createAdminClient(connectionParams);
    return getDatabase_1.getDatabase(client, TEST_DATABASE).then(function () {
        throw 'Test Database should not exist before calling tests';
    }).catch(function () {
        return createDatabase_1.createDatabase(client, { 'database-name': TEST_DATABASE });
    }).then(function () {
        return getDatabase_1.getDatabase(client, TEST_DATABASE);
    }).then(function () {
        return deleteDatabase_1.deleteDatabase(client, TEST_DATABASE);
    }).then(function () {
        return getDatabase_1.getDatabase(client, TEST_DATABASE);
    }).then(function () {
        throw 'Test Database should not exist after the tests';
    }).catch(function () {
        return Promise.resolve();
    });
}
exports.createANewDatabase = createANewDatabase;
//# sourceMappingURL=createGetDeleteDatabaseTest.js.map