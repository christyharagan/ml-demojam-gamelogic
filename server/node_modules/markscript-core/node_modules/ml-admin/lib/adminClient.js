var marklogic_1 = require('marklogic');
function createAdminClient(connectionParams) {
    return marklogic_1.createDatabaseClient({
        host: connectionParams.host,
        port: connectionParams.port === undefined ? 8001 : connectionParams.port,
        database: connectionParams.database || 'Documents',
        user: connectionParams.user === undefined ? 'admin' : connectionParams.user,
        password: connectionParams.password,
        authType: connectionParams.authType,
        ssl: connectionParams.ssl,
        agent: connectionParams.agent
    });
}
exports.createAdminClient = createAdminClient;
//# sourceMappingURL=adminClient.js.map