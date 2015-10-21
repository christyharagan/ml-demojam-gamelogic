import {GameLogicDatabase} from './build/databaseModel'
import {basicBuildPlugin} from 'markscript-basic-build'
import {Runtime} from 'markscript-koa'
import {uServicesPlugin} from 'markscript-uservices-build'
import {test} from './test/test'

const COMMON = {
  appName: 'ml-gamescript-demo',
  ml: {
    host: 'christys-macbook-pro.local',
    port: 8012,
    user: 'admin',
    password: 'passw0rd'
  },
  koa: {
    host: 'localhost',
    port: 8081
  }
}

export const build: MarkScript.Build = {
  buildConfig: <MarkScript.BuildConfig & MarkScript.BasicBuildConfig & MarkScript.KoaBuildConfig & MarkScript.UServicesBuildConfig>{
    databaseConnection: {
      host: COMMON.ml.host,
      httpPort: COMMON.ml.port,
      adminPort: 8001,
      configPort: 8002,
      user: COMMON.ml.user,
      password: COMMON.ml.password,
    },
    database: {
      modelObject: new GameLogicDatabase(COMMON.appName, COMMON.ml.port, COMMON.ml.host)
    },
    middle: {
      host: COMMON.koa.host,
      port: COMMON.koa.port
    },
    assetBaseDir: './src',
    fileServerPath: './www'
  },
  plugins: [basicBuildPlugin, uServicesPlugin],
  runtime: Runtime,
  tasks: {
    clear: {
      execute: function(buildModel: MarkScript.BuildModel, buildConfig: MarkScript.BuildConfig, runtime: Runtime) {
        let preperationService = <GameLogic.PlayerService>runtime.getService('player')
        return preperationService.prepare()
      },
      description: 'Clear player data before starting a new demo'
    },
    test: {
      execute: function(buildModel: MarkScript.BuildModel, buildConfig: MarkScript.BuildConfig, runtime: Runtime) {
        return test(runtime)
      },
      description: 'Server test to ensure everything works as expected'
    }
  }
}
