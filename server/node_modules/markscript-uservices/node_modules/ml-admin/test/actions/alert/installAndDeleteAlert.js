require('should');
require('should-promised');
var adminClient_1 = require('../../../lib/adminClient');
var getModule_1 = require('../../../lib/actions/modules/getModule');
var installModule_1 = require('../../../lib/actions/modules/installModule');
var getAlert_1 = require('../../../lib/actions/alerts/getAlert');
var installAlert_1 = require('../../../lib/actions/alerts/installAlert');
var getDocuments_1 = require('../../../lib/actions/documents/getDocuments');
var TEST_DOC_1 = '/triggering/testDoc.json';
var TEST_DOC_2 = 'generatedDoc2.json';
var TEST_ALERT = 'testAlert';
var TEST_DATABASE = 'testDatabase';
var CREATE_TEST_DOC = 'testModules/createTestDoc';
var testModule = "\nmodule.exports = function(uri, content) {\n  declareUpdate();\n  xdmp.documentInsert(uri.toString().trim(), content);\n  //xdmp.documentInsert('" + TEST_DOC_2 + "', content);\n}";
describe('install and delete an alert', function () {
    it('should create a new alert which creates a document, and then should the alert should be deleted', function () {
        return createANewAleart().should.be.fulfilled;
    });
});
function createANewAleart() {
    var adminClient = adminClient_1.createAdminClient({
        password: 'passw0rd'
    });
    var clientClient = adminClient_1.createAdminClient({
        password: 'passw0rd',
        port: 8000
    });
    return getModule_1.getModule(clientClient, CREATE_TEST_DOC).then(function () {
        throw 'Test Module should not exist before calling tests';
    }).catch(function () {
        return getDocuments_1.getDocuments(clientClient, { uri: TEST_DOC_1 });
    }).then(function () {
        throw 'Test Document should not exist before calling tests';
    }).catch(function () {
        return getDocuments_1.getDocuments(clientClient, { uri: TEST_DOC_2 });
    }).then(function () {
        throw 'Test Document should not exist before calling tests';
    }).catch(function () {
        return getAlert_1.getAlert(clientClient, TEST_ALERT);
    }).then(function () {
        throw 'Test Alert should not exist before calling tests';
    }).catch(function () {
        return installModule_1.installModule(clientClient, CREATE_TEST_DOC, testModule, 'text');
    }).then(function () {
        return installAlert_1.installAlert(clientClient, {
            alertUri: TEST_ALERT,
            alertName: TEST_ALERT,
            actionName: CREATE_TEST_DOC,
            actionModule: '/ext/' + CREATE_TEST_DOC + '.sjs',
            triggerScope: '/triggering/'
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            clientClient.eval("declareUpdate();xdmp.documentInsert('" + TEST_DOC_1 + "', {Hello: 'World'});").result(resolve).catch(reject);
        });
    }).then(function () {
        return getDocuments_1.getDocuments(clientClient, { uri: TEST_DOC_1 });
    }).then(function (doc) {
        doc.should.equal('Hello World');
        return getDocuments_1.getDocuments(clientClient, { uri: TEST_DOC_2 });
    }).then(function (doc) {
        doc.should.equal('Hello World');
    });
}
exports.createANewAleart = createANewAleart;
//# sourceMappingURL=installAndDeleteAlert.js.map