import {BuildOptions} from 'markscript-core'
import {UServicesPlugin, UServicesBuildOptions} from 'markscript-uservices'
import {MLNordicDemo} from './lib/databaseModel'
import * as path from 'path'
import {RunOptions} from 'markscript-project'
import {test} from './test/test'
import {loadData} from './example/loadData'

const COMMON = {
  appName: 'ml-nordic-demo',
  ml: {
    port: 8008,
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
    modelObject: new MLNordicDemo(COMMON.appName, COMMON.ml.host, COMMON.ml.port),
    modules: './lib/**/*.ts'
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
    fileServerPath: '../client'
  }
}

export const tasks = {
  test: test,
  loadData: loadData
}
