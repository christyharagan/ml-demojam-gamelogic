require('should');
require('should-promised');
var adminClient_1 = require('../../../lib/adminClient');
var createRestApi_1 = require('../../../lib/actions/restapis/createRestApi');
var getRestApi_1 = require('../../../lib/actions/restapis/getRestApi');
var deleteRestApi_1 = require('../../../lib/actions/restapis/deleteRestApi');
var installServiceResourceExtension_1 = require('../../../lib/actions/restapis/installServiceResourceExtension');
var rest_1 = require('../../../lib/utils/rest');
var TEST_REST_API = 'testRestApi';
var TEST_DATABASE = 'testContentDatabase';
var TEST_MODULES = 'testModulesDatabase';
function get(context, params) {
    return "Hello " + params.msg;
}
var code = String(get);
describe('deploy and undeploy rest extension', function () {
    it('should create a new rest api, deploy a resource extension, then remove the rest api', function () {
        deployRestExtension().should.be.fulfilled;
    });
});
function deployRestExtension() {
    var connectionParams = {
        password: 'passw0rd'
    };
    var client = adminClient_1.createAdminClient(connectionParams);
    return getRestApi_1.getRestApi(client, TEST_REST_API).then(function () {
        throw 'Test REST API should not exist before calling tests';
    }).catch(function () {
        return createRestApi_1.createRestApi(client, {
            name: TEST_REST_API,
            database: TEST_DATABASE,
            'modules-database': TEST_MODULES,
            port: 8099
        });
    }).then(function () {
        return getRestApi_1.getRestApi(client, TEST_REST_API);
    }).then(function () {
        return installServiceResourceExtension_1.installServiceResourceExtension(client, {
            name: 'hello',
            methods: {
                GET: {
                    msg: "string"
                }
            }
        }, code);
    }).then(function () {
        return rest_1.basicRestCall(client, '/LATEST/resources/hello?msg="world"', 'testRestApi');
    }).then(function (msg) {
        msg.should.equal('Hello world');
        return deleteRestApi_1.deleteRestApi(client, 'hello', true, true);
    }).then(function () {
        return getRestApi_1.getRestApi(client, TEST_REST_API);
    }).then(function () {
        throw 'Test REST API should not exist after the tests';
    }).catch(function () {
        return Promise.resolve();
    });
}
exports.deployRestExtension = deployRestExtension;
//# sourceMappingURL=deployAndUndeployRestExtensionTest.js.map