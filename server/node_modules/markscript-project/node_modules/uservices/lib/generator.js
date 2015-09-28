var typescript_schema_1 = require('typescript-schema');
function defaultIsService(decorator) {
    return decorator.decoratorType.name === 'Service' && decorator.decoratorType.parent.name === 'uservices/dist/lib/decorators';
}
exports.defaultIsService = defaultIsService;
function generateServiceSpecs(modules, isService, onService, onMethod, onEvent, visitor) {
    var services = {};
    isService = isService || defaultIsService;
    typescript_schema_1.visitModules(modules, {
        onModule: function (module) {
            return {
                onClassConstructor: function (classConstructor) {
                    return {
                        onClassConstructorDecorator: function (decorator) {
                            if (isService(decorator)) {
                                var name_1 = typescript_schema_1.expressionToLiteral(decorator.parameters[0]);
                                var service = {
                                    name: name_1,
                                    methods: {},
                                    events: {},
                                    type: classConstructor
                                };
                                if (onService) {
                                    onService(service, classConstructor);
                                }
                                generateServiceSpec(name_1, classConstructor, onMethod, onEvent, service);
                                services[name_1] = service;
                            }
                        }
                    };
                }
            };
        }
    });
    return services;
}
exports.generateServiceSpecs = generateServiceSpecs;
function generateServiceSpec(name, classConstructor, onMethod, onEvent, service) {
    service = service || {
        name: name,
        methods: {},
        events: {},
        type: classConstructor
    };
    typescript_schema_1.visitClassConstructor(classConstructor, {
        onInstanceType: function (t) {
            return {
                onMember: function (member) {
                    if (member.type.typeKind === typescript_schema_1.TypeKind.FUNCTION) {
                        var functionSchema = member.type;
                        var type = functionSchema.type;
                        if (type.name === 'Observable') {
                            var event_1 = {
                                name: member.name,
                                service: service,
                                type: functionSchema
                            };
                            if (onEvent) {
                                event_1 = onEvent(event_1, member);
                            }
                            if (event_1) {
                                service.events[member.name] = event_1;
                            }
                        }
                        else if (type.name === 'Promise') {
                            var method = {
                                name: member.name,
                                service: service,
                                type: functionSchema
                            };
                            if (onMethod) {
                                method = onMethod(method, member);
                            }
                            if (method) {
                                service.methods[member.name] = method;
                            }
                        }
                    }
                }
            };
        }
    });
    return service;
}
exports.generateServiceSpec = generateServiceSpec;
//# sourceMappingURL=generator.js.map