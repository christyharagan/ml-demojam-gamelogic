var uservices_1 = require('uservices');
var rx_1 = require('rx');
function createRemoteProxy(socket, serviceSpec) {
    var proxy = {};
    uservices_1.visitService(serviceSpec, {
        onMethod: function (memberSchema) {
            var name = memberSchema.name;
            proxy[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return new Promise(function (resolve, reject) {
                    socket.emit(name, args, function (value, error) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(value);
                        }
                    });
                });
            };
        },
        onEvent: function (memberSchema) {
            var name = memberSchema.name;
            proxy[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var observer = new rx_1.Subject();
                socket.emit(name, args, function (id) {
                    socket.on(name + id, function (_a) {
                        var value = _a[0], error = _a[1], completed = _a[2];
                        if (completed) {
                            observer.onCompleted();
                        }
                        else if (error) {
                            observer.onError(error);
                        }
                        else {
                            observer.onNext(value);
                        }
                    }).emit(name + id, true);
                });
                return observer;
            };
        }
    });
    return proxy;
}
exports.createRemoteProxy = createRemoteProxy;
//# sourceMappingURL=remoteProxy.js.map