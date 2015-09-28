import * as ms from 'markscript-core'
import * as g from './generator'
import * as m from './model'
import * as u from 'uservices'
import * as fs from 'fs'
import * as path from 'path'

export interface UServicesBuildOptions {
  serviceSpecs?: m.MLServices
}

export const UServicesPlugin: ms.Plugin<UServicesBuildOptions> = {
  generateModel: function(databaseModel: ms.Model&ms.AssetModel, pluginOptions: UServicesBuildOptions, options: ms.BuildOptions) {
    let serviceSpecs = pluginOptions.serviceSpecs
    if (!serviceSpecs) {
      if (options.typeModel) {
        serviceSpecs = g.generateServiceSpecs(options.typeModel)
      } else {
        if (!fs.existsSync(path.join(options.pkgDir, 'service-specs.json'))) {
          throw new Error('To build the uservices, either a service-spec.json must exist in the package directory, or a type model provided to generate one')
        }
        serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'service-specs.json')).toString())
      }
    }

    pluginOptions.serviceSpecs = serviceSpecs
    g.generateAssetModel(serviceSpecs, options.middle.host + ':' + options.middle.port, options.database.model, options.pkgDir)
  },
  serialiseModel: function(databaseModel: ms.Model&ms.AssetModel, pluginOptions: UServicesBuildOptions, options: ms.BuildOptions): { [modelName: string]: string } {
    return {
      'service-specs': u.stringify(pluginOptions.serviceSpecs)
    }
  }
}
