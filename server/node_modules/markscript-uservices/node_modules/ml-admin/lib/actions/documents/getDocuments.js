function getDocuments(client, config) {
    return new Promise(function (resolve, reject) {
        client.eval("declareUpdate();xdmp.documentGet('" + config.uri + "', content);").result(resolve, reject);
    });
}
exports.getDocuments = getDocuments;
//# sourceMappingURL=getDocuments.js.map