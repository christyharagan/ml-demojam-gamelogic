var markscript_uservices_1 = require('markscript-uservices');
var databaseModel_1 = require('./lib/databaseModel');
var test_1 = require('./test/test');
var loadData_1 = require('./example/loadData');
var COMMON = {
    appName: 'ml-nordic-demo',
    ml: {
        port: 8008,
        host: 'localhost',
        user: 'admin',
        password: 'passw0rd'
    },
    koa: {
        host: 'localhost',
        port: 8080
    }
};
exports.buildOptions = {
    database: {
        host: COMMON.ml.host,
        httpPort: COMMON.ml.port,
        adminPort: 8001,
        configPort: 8002,
        user: COMMON.ml.user,
        password: COMMON.ml.password,
        modelObject: new databaseModel_1.MLNordicDemo(COMMON.appName, COMMON.ml.host, COMMON.ml.port),
        modules: './lib/**/*.ts'
    },
    middle: {
        host: COMMON.koa.host,
        port: COMMON.koa.port
    },
    plugins: {
        uservices: [markscript_uservices_1.UServicesPlugin, {}]
    }
};
exports.runOptions = {
    database: {
        host: COMMON.ml.host,
        port: COMMON.ml.port,
        name: COMMON.appName + '-content',
        user: COMMON.ml.user,
        password: COMMON.ml.password,
    },
    middle: {
        host: COMMON.koa.host,
        port: COMMON.koa.port,
        fileServerPath: '../client'
    }
};
exports.tasks = {
    test: test_1.test,
    loadData: loadData_1.loadData
};
//# sourceMappingURL=markscriptfile.js.map