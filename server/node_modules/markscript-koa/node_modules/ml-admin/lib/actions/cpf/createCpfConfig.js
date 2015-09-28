function createDocument(client, config, content) {
    return new Promise(function (resolve, reject) {
        client.eval("declareUpdate();xdmp.documentInsert('" + config.uri + "', content);").result(resolve, reject);
    });
}
exports.createDocument = createDocument;
//# sourceMappingURL=createCpfConfig.js.map