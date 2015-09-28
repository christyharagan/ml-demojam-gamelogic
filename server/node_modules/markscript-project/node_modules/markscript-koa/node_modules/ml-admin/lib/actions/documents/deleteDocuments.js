function deleteDocuments(client, config) {
    return new Promise(function (resolve, reject) {
        client.eval("declareUpdate();xdmp.documentDelete('" + config.uri + "', content);").result(resolve, reject);
    });
}
exports.deleteDocuments = deleteDocuments;
//# sourceMappingURL=deleteDocuments.js.map