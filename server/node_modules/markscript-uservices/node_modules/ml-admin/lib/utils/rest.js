var mlrest_1 = require('marklogic/lib/mlrest');
function createUrl(path, parameters) {
    path += '?';
    Object.keys(parameters).forEach(function (name) {
        var value = parameters[name];
        if (Array.isArray(value)) {
            var array = value;
            array.forEach(function (value) {
                path += "&" + name + "=" + value;
            });
        }
        else {
            path += "&" + name + "=" + value;
        }
    });
    return path;
}
exports.createUrl = createUrl;
function basicRestCall(client, endpoint, description, method, body, headers) {
    if (method === void 0) { method = 'GET'; }
    var requestOptions = {
        method: method,
        path: endpoint,
        headers: headers
    };
    Object.keys(client.connectionParams).forEach(function (key) {
        requestOptions[key] = client.connectionParams[key];
    });
    var operation = mlrest_1.createOperation(description, client, requestOptions, 'single', 'single');
    if (body !== undefined) {
        operation.requestBody = body;
    }
    return new Promise(function (resolve, reject) {
        mlrest_1.startRequest(operation).result(resolve, reject);
    });
}
exports.basicRestCall = basicRestCall;
//# sourceMappingURL=rest.js.map