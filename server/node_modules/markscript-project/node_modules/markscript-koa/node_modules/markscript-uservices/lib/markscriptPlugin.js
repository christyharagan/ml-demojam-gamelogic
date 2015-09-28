var g = require('./generator');
var u = require('uservices');
var fs = require('fs');
var path = require('path');
exports.UServicesPlugin = {
    generateModel: function (databaseModel, pluginOptions, options) {
        var serviceSpecs = pluginOptions.serviceSpecs;
        if (!serviceSpecs) {
            if (options.typeModel) {
                serviceSpecs = g.generateServiceSpecs(options.typeModel);
            }
            else {
                if (!fs.existsSync(path.join(options.pkgDir, 'service-specs.json'))) {
                    throw new Error('To build the uservices, either a service-spec.json must exist in the package directory, or a type model provided to generate one');
                }
                serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'service-specs.json')).toString());
            }
        }
        pluginOptions.serviceSpecs = serviceSpecs;
        g.generateAssetModel(serviceSpecs, options.middle.host + ':' + options.middle.port, options.database.model, options.pkgDir);
    },
    serialiseModel: function (databaseModel, pluginOptions, options) {
        return {
            'service-specs': u.stringify(pluginOptions.serviceSpecs)
        };
    }
};
//# sourceMappingURL=markscriptPlugin.js.map