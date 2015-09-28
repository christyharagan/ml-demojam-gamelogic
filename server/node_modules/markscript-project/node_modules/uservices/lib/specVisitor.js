function visitServices(services, visitor) {
    Object.keys(services).forEach(function (name) {
        var service = services[name];
        var v = visitor.onService(service);
        if (v) {
            visitService(service, v);
        }
    });
}
exports.visitServices = visitServices;
function visitService(service, visitor) {
    if (visitor.onMethod && service.methods) {
        Object.keys(service.methods).forEach(function (name) {
            var method = service.methods[name];
            visitor.onMethod(method);
        });
    }
    if (visitor.onEvent && service.events) {
        Object.keys(service.events).forEach(function (name) {
            var event = service.events[name];
            visitor.onEvent(event);
        });
    }
}
exports.visitService = visitService;
//# sourceMappingURL=specVisitor.js.map