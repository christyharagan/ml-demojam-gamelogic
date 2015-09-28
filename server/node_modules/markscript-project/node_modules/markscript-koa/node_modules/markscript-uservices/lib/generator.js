var typescript_schema_1 = require('typescript-schema');
var p = require('typescript-package');
var u = require('uservices');
var m = require('./model');
var path = require('path');
var fs = require('fs');
var ms = require('markscript-core');
function generateServiceSpecs(modules) {
    return u.generateServiceSpecs(modules, function (decorator) {
        return decorator.decoratorType.name === 'mlService' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators';
    }, null, function (method, member) {
        if (member.decorators) {
            var mlMethod = member.decorators.filter(function (decorator) {
                return decorator.decoratorType.name === 'mlMethod' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators';
            })[0];
            if (mlMethod) {
                if (mlMethod.parameters && mlMethod.parameters[0]) {
                    var oe = mlMethod.parameters[0];
                    var ee = oe.properties['method'];
                    method.method = ee.value === 'PUT' ? m.METHOD.PUT : m.METHOD.POST;
                }
                if (!method.method) {
                    method.method = m.METHOD.POST;
                }
                return method;
            }
        }
    }, function (event, member) {
        if (member.decorators) {
            var mlEvent = member.decorators.filter(function (decorator) {
                return decorator.decoratorType.name === 'mlEvent' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators';
            })[0];
            if (mlEvent) {
                var eventOptions = typescript_schema_1.expressionToLiteral(mlEvent.parameters[0]);
                if (eventOptions) {
                    event.states = eventOptions.states;
                    event.scope = eventOptions.scope;
                }
                return event;
            }
        }
    });
}
exports.generateServiceSpecs = generateServiceSpecs;
function generateAssetModel(serviceSpecs, baseUri, assetModel, pkgDir) {
    if (!assetModel.modules) {
        assetModel.modules = {};
    }
    assetModel.modules['markscript-uservices'] = {
        name: 'markscript-uservices',
        code: fs.readFileSync(path.join(__dirname, 'rfp.js'), 'utf8')
    };
    u.visitServices(serviceSpecs, {
        onService: function (serviceSpec) {
            var moduleName;
            var className;
            if (serviceSpec.implementation) {
                moduleName = serviceSpec.implementation.moduleName;
                className = serviceSpec.implementation.className;
                var suffix = moduleName.substring(moduleName.length - 3);
                var modulePath;
                if (suffix !== '.ts' && suffix !== '.js') {
                    if (fs.existsSync(path.join(pkgDir, moduleName + '.js'))) {
                        modulePath = moduleName + '.js';
                    }
                    else if (fs.existsSync(path.join(pkgDir, moduleName + '.ts'))) {
                        modulePath = moduleName + '.ts';
                    }
                    else {
                        throw new Error('Cannot find module: ' + moduleName + ' at package directory: ' + pkgDir);
                    }
                }
                else {
                    modulePath = moduleName;
                    moduleName = moduleName.substring(0, moduleName.length - 3);
                }
                var packageJson = p.getPackageJson(pkgDir);
                moduleName = '/' + path.join(packageJson.name, moduleName);
                ms.addModules(assetModel, pkgDir, [modulePath]);
            }
            else if (serviceSpec.type) {
                var cc = serviceSpec.type;
                moduleName = '/' + typescript_schema_1.containerToString(cc.parent).replace(/:/g, '/');
                className = cc.name;
            }
            else {
                throw new Error('To generate the service spec assets, either an implementation or type model must be provided, for service: ' + serviceSpec.name);
            }
            return {
                onMethod: function (method) {
                    var sjs = 'var Service = r' + ("equire('" + moduleName + "')." + className + ";\nvar service = new Service();");
                    var methodType = m.methodToString(method.method);
                    var methods = {};
                    methods[methodType] = {};
                    sjs += "\nexports." + methodType + " = function(context, params, input){\ncontext.outputTypes = [\"application/json\"];\n// TODO: This will only work for POST\nvar promise = service." + method.name + ".apply(service, input.toObject());\nvar value;\nvar error;\npromise.then(function(v){\nvalue = v;\n}, function(e){\nerror = e;\n});\nif (error) {\nthrow error;\n} else {\n  if (\"" + methodType + "\" === \"POST\" && value.count > 1) {\n    for (var i = 1; i < value.count; i++) {\n      context.outputTypes.push(\"application/json\");\n    }\n  }\n  return value\n}\n};";
                    var extensionName = serviceSpec.name + '-' + method.name;
                    if (!assetModel.extensions) {
                        assetModel.extensions = {};
                    }
                    assetModel.extensions[extensionName] = {
                        name: extensionName,
                        code: sjs
                    };
                },
                onEvent: function (event) {
                    var states;
                    if (!event.states) {
                        states = [ms.TRIGGER_STATE.CREATE, ms.TRIGGER_STATE.MODIFY];
                    }
                    else if (Array.isArray(event.states)) {
                        states = event.states;
                    }
                    else {
                        states = [event.states];
                    }
                    var path = serviceSpec.name + '-' + event.name;
                    if (baseUri.charAt(baseUri.length - 1) !== '/') {
                        baseUri += '/';
                    }
                    var code = 'var Service = r' + ("equire('" + moduleName + "')." + className + ";\nvar service = new Service();\nvar rfp = r") + 'e' + ("quire('/markscript-uservices');\nvar observable = service." + event.name + "();\nobservable.subscribe(new rfp.HttpObserver(\n'" + (baseUri + path) + "',\n{\nheaders: {\n\"content-type\": \"application/json\"\n}\n}));\n\nmodule.exports = function(uri, content){\nobservable.onNext({uri: uri, content: content});\n}");
                    var alertModuleName = '/_alerts' + moduleName.replace(/:/g, '/') + '/' + className + '/' + event.name;
                    if (!assetModel.modules) {
                        assetModel.modules = {};
                    }
                    assetModel.modules[alertModuleName] = {
                        name: alertModuleName,
                        code: code
                    };
                    if (!assetModel.alerts) {
                        assetModel.alerts = {};
                    }
                    assetModel.alerts[path] = {
                        name: path,
                        scope: event.scope,
                        states: states,
                        depth: event.depth,
                        commit: event.commit,
                        actionModule: alertModuleName
                    };
                }
            };
        }
    });
}
exports.generateAssetModel = generateAssetModel;
//# sourceMappingURL=generator.js.map