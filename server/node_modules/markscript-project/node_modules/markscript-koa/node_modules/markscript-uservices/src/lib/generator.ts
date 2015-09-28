import {reflective as s, KeyValue, expressionToLiteral, containerToString} from 'typescript-schema'
import * as p from 'typescript-package'
import * as u from 'uservices'
import * as m from './model'
import * as path from 'path'
import * as fs from 'fs'
import * as ms from 'markscript-core'

export function generateServiceSpecs(modules: KeyValue<s.Module>): m.MLServices {
  return u.generateServiceSpecs(
    modules,
    function(decorator: s.Decorator<s.ClassConstructor>) {
      return decorator.decoratorType.name === 'mlService' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators'
    },
    null,
    function(method: m.MLMethod, member: s.ClassConstructorMember) {
      if (member.decorators) {
        let mlMethod = member.decorators.filter(function(decorator) {
          return decorator.decoratorType.name === 'mlMethod' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators'
        })[0]
        if (mlMethod) {
          // TODO: Waiting on better enum-expression support in typescript-schema
          if (mlMethod.parameters && mlMethod.parameters[0]) {
            let oe = <s.ObjectExpression>mlMethod.parameters[0]
            let ee = <s.EnumExpression>oe.properties['method']
            method.method = ee.value === 'PUT' ? m.METHOD.PUT : m.METHOD.POST
          }
          if (!method.method) {
            method.method = m.METHOD.POST
          }
          return method
        }
      }
    },
    function(event: m.MLEvent, member: s.ClassConstructorMember) {
      if (member.decorators) {
        let mlEvent = member.decorators.filter(function(decorator) {
          return decorator.decoratorType.name === 'mlEvent' && decorator.decoratorType.parent.name === 'markscript-uservices/dist/lib/decorators'
        })[0]
        if (mlEvent) {
          let eventOptions = <m.EventOptions>expressionToLiteral(mlEvent.parameters[0])
          if (eventOptions) {
            event.states = eventOptions.states
            event.scope = eventOptions.scope
          }
          return event
        }
      }
    })
}

export function generateAssetModel(serviceSpecs: m.MLServices, baseUri: string, assetModel: ms.AssetModel, pkgDir?: string) {
  // TODO: We need a better way of plugins providing module-code
  // TODO: Remove this ugly hack
  if (!assetModel.modules) {
    assetModel.modules = {}
  }
  assetModel.modules['markscript-uservices'] = {
    name: 'markscript-uservices',
    code: fs.readFileSync(path.join(__dirname, 'rfp.js'), 'utf8')
  }

  u.visitServices(serviceSpecs, {
    onService: function(serviceSpec) {
      let moduleName: string
      let className: string
      if (serviceSpec.implementation) {
        moduleName = serviceSpec.implementation.moduleName
        className = serviceSpec.implementation.className
        let suffix = moduleName.substring(moduleName.length - 3)
        let modulePath: string
        if (suffix !== '.ts' && suffix !== '.js') {
          if (fs.existsSync(path.join(pkgDir, moduleName + '.js'))) {
            modulePath = moduleName + '.js'
          } else if (fs.existsSync(path.join(pkgDir, moduleName + '.ts'))) {
            modulePath = moduleName + '.ts'
          } else {
            throw new Error('Cannot find module: ' + moduleName + ' at package directory: ' + pkgDir)
          }
        } else {
          modulePath = moduleName
          moduleName = moduleName.substring(0, moduleName.length - 3)
        }
        let packageJson = p.getPackageJson(pkgDir)
        moduleName = '/' + path.join(packageJson.name, moduleName)
        ms.addModules(assetModel, pkgDir, [modulePath])
      } else if (serviceSpec.type) {
        let cc = <s.ClassConstructor>serviceSpec.type
        moduleName = '/' + containerToString(cc.parent).replace(/:/g, '/')
        className = cc.name
      } else {
        throw new Error('To generate the service spec assets, either an implementation or type model must be provided, for service: ' + serviceSpec.name)
      }

      return <u.ServiceVisitor<m.MLMethod, m.MLEvent>>{
        onMethod: function(method) {
          let sjs = 'var Service = r' + `equire('${moduleName}').${className};
var service = new Service();`

          let methodType = m.methodToString(method.method)
          // TODO: Currently this implementation only works for POST. Forcing POST method type, but fix to work for other types
          //methodType = 'POST'
          let methods = {}
          methods[methodType] = {}

          sjs += `
exports.${methodType} = function(context, params, input){
context.outputTypes = ["application/json"];
// TODO: This will only work for POST
var promise = service.${method.name}.apply(service, input.toObject());
var value;
var error;
promise.then(function(v){
value = v;
}, function(e){
error = e;
});
if (error) {
throw error;
} else {
  if ("${methodType}" === "POST" && value.count > 1) {
    for (var i = 1; i < value.count; i++) {
      context.outputTypes.push("application/json");
    }
  }
  return value
}
};`
          let extensionName = serviceSpec.name + '-' + method.name
          if (!assetModel.extensions) {
            assetModel.extensions = {}
          }
          assetModel.extensions[extensionName] = {
            name: extensionName,
            code: sjs
          }
        },
        onEvent: function(event) {
          let states: ms.TRIGGER_STATE[]
          if (!event.states) {
            states = [ms.TRIGGER_STATE.CREATE, ms.TRIGGER_STATE.MODIFY]
          } else if (Array.isArray(event.states)) {
            states = <Array<ms.TRIGGER_STATE>>event.states
          } else {
            states = [<ms.TRIGGER_STATE>event.states]
          }
          let path = serviceSpec.name + '-' + event.name
          if (baseUri.charAt(baseUri.length - 1) !== '/') {
            baseUri += '/'
          }

          let code = 'var Service = r' + `equire('${moduleName}').${className};
var service = new Service();
var rfp = r` + 'e' + `quire('/markscript-uservices');
var observable = service.${event.name}();
observable.subscribe(new rfp.HttpObserver(
'${baseUri + path}',
{
headers: {
"content-type": "application/json"
}
}));

module.exports = function(uri, content){
observable.onNext({uri: uri, content: content});
}`
          let alertModuleName = '/_alerts' + moduleName.replace(/:/g, '/') + '/' + className + '/' + event.name
          if (!assetModel.modules) {
            assetModel.modules = {}
          }
          assetModel.modules[alertModuleName] = {
            name: alertModuleName,
            code: code
          }
          if (!assetModel.alerts) {
            assetModel.alerts = {}
          }
          assetModel.alerts[path] = {
            name: path,
            scope: event.scope,
            states: states,
            depth: event.depth,
            commit: event.commit,
            actionModule: alertModuleName
          }
        }
      }
    }
  })
}
