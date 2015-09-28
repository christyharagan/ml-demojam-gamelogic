var u = require('uservices');
var m = require('./model');
var mlrest_1 = require('marklogic/lib/mlrest');
function createRemoteProxy(service, client, server) {
    var proxy = {};
    u.visitService(service, {
        onMethod: function (method) {
            proxy[method.name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var options = {
                    method: m.methodToString(method.method),
                    path: '/v1/resources/' + service.name + '-' + method.name,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                Object.keys(client.connectionParams).forEach(function (key) {
                    options[key] = client.connectionParams[key];
                });
                var operation = mlrest_1.createOperation(service.name + '-' + method.name, client, options, 'single', 'single');
                operation.requestBody = JSON.stringify(args);
                return new Promise(function (resolve, reject) {
                    mlrest_1.startRequest(operation).result(function (value) {
                        if (Array.isArray(value)) {
                            resolve(value.map(function (v) {
                                return v.content;
                            }));
                        }
                        else {
                            resolve(value);
                        }
                    }).catch(function (e) {
                        console.log(e.stack);
                        reject(e);
                    });
                });
            };
        },
        onEvent: function (event) {
            var observable = server.post('/' + service.name + '-' + event.name).map(function (value) {
                if (value.value) {
                    return value.value;
                }
                else {
                    throw value.error;
                }
            });
            proxy[event.name] = function () {
                return observable;
            };
        }
    });
    return proxy;
}
exports.createRemoteProxy = createRemoteProxy;
//# sourceMappingURL=remoteProxy.js.map