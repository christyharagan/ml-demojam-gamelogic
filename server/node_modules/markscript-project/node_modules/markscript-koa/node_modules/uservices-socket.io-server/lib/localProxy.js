var uservices_1 = require('uservices');
function createLocalProxy(server, serviceSpec, service) {
    server.on('connection', function (socket) {
        uservices_1.visitService(serviceSpec, {
            onMethod: function (memberSchema) {
                var name = memberSchema.name;
                var func = service[name];
                socket.on(serviceSpec.name + '/' + name, function (args, cb) {
                    func.apply(service, args).then(cb).catch(cb.bind(null, null));
                });
            },
            onEvent: function (memberSchema) {
                var name = serviceSpec.name + '/' + memberSchema.name;
                var event = service[memberSchema.name];
                socket.on(name, function (args, cb) {
                    var id = String(Date.now());
                    socket.once(name + id, function () {
                        var observable = event.apply(service, args);
                        observable.subscribe(function (value) {
                            socket.emit(name + id, [value]);
                        }, function (error) {
                            socket.emit(name + id, [null, error]);
                        }, function () {
                            socket.emit(name + id);
                        });
                    });
                    cb(id);
                });
            }
        });
    });
}
exports.createLocalProxy = createLocalProxy;
//# sourceMappingURL=localProxy.js.map