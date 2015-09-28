import {BuildOptions} from 'markscript-core'
import {UServicesPlugin, UServicesBuildOptions} from 'markscript-uservices'
import {MLGamescriptDemo} from './src/lib/databaseModel'
import * as path from 'path'
import {RunOptions} from 'markscript-project'
import {clear} from './server'
import {test} from './src/test/test'

const COMMON = {
  appName: 'ml-gamescript-demo',
  ml: {
    port: 8012,
    host: 'localhost',
    user: 'admin',
    password: 'passw0rd'
  },
  koa: {
    host: 'localhost',
    port: 8080
  }
}

export const buildOptions: BuildOptions = {
  database: {
    host: COMMON.ml.host,
    httpPort: COMMON.ml.port,
    adminPort: 8001,
    configPort: 8002,
    user: COMMON.ml.user,
    password: COMMON.ml.password,
    modelObject: new MLGamescriptDemo(COMMON.appName, COMMON.ml.host, COMMON.ml.port),
    modules: './src/lib/**/*.ts'
  },
  middle: {
    host: COMMON.koa.host,
    port: COMMON.koa.port
  },
  plugins: {
    uservices: [UServicesPlugin, {}]
  }
}

export const runOptions: RunOptions = {
  database: {
    host: COMMON.ml.host,
    port: COMMON.ml.port,
    name: COMMON.appName + '-content',
    user: COMMON.ml.user,
    password: COMMON.ml.password,
  },
  middle: {
    host: COMMON.koa.host,
    port: COMMON.koa.port,
    fileServerPath: './www'
  }
}

export const tasks = {
  clear: clear,
  test: test
}
