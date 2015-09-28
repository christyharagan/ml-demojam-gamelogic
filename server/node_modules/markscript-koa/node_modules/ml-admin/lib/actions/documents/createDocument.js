function createDocument(client, config, content) {
    return new Promise(function (resolve, reject) {
        content = content.replace(/\\/g, '\\\\').replace(/\t/g, '  ').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\'/g, '\\\'');
        client.eval("declareUpdate();\nvar textNode = new NodeBuilder();\ntextNode.addText('" + content + "');\ntextNode = textNode.toNode();\nxdmp.documentInsert('" + config.uri + "', textNode);").result(resolve, reject);
    });
}
exports.createDocument = createDocument;
//# sourceMappingURL=createDocument.js.map