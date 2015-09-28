function stringifyReplacer(key, value) {
    if (key === 'service') {
        return undefined;
    }
    else if (key === 'name' && !value.events) {
        return undefined;
    }
    else if (key === 'type') {
        return undefined;
    }
    else {
        return value;
    }
}
function stringify(service) {
    return JSON.stringify(service, stringifyReplacer, '  ');
}
exports.stringify = stringify;
function parse(serviceString) {
    var services = JSON.parse(serviceString);
    Object.keys(services).forEach(function (name) {
        var service = services[name];
        service.name = name;
        if (service.methods) {
            Object.keys(service.methods).forEach(function (name) {
                var method = service.methods[name];
                method.name = name;
                method.service = service;
                if (method.type) {
                }
            });
        }
        else {
            service.methods = {};
        }
        if (service.events) {
            Object.keys(service.events).forEach(function (name) {
                var event = service.events[name];
                event.name = name;
                event.service = service;
                if (event.type) {
                }
            });
        }
        else {
            service.events = {};
        }
        if (service.type) {
        }
    });
    return services;
}
exports.parse = parse;
//# sourceMappingURL=serialiserParser.js.map