import * as io from 'socket.io'
import * as http from 'http'
import * as m from 'markscript-core'
import * as mu from 'markscript-uservices-build'
import * as b from 'markscript-basic-build'
import * as u from 'uservices'
import {RxRouter} from 'koa-rx-router'
import {createLocalProxy} from 'uservices-socket.io-server'

let koa = require('koa')
let serve = require('koa-static')
let cors = require('koa-cors')

export interface KoaBuildConfig {
  fileServerPath?: string
}

export class Server extends b.Runtime implements mu.UServicesRuntime {
  buildModel: MarkScript.BuildModel&mu.UServicesBuildModel
  buildConfig: MarkScript.BuildConfig&mu.UServicesBuildConfig&KoaBuildConfig
  private services: { [name: string]: any } = {}
  private httpServer: http.Server

  getService<T>(name: string): T {
    return this.services[name]
  }

  constructor(buildModel: MarkScript.BuildModel&mu.UServicesBuildModel, buildConfig: MarkScript.BuildConfig&mu.UServicesBuildConfig&KoaBuildConfig) {
    super(buildModel, buildConfig)
  }

  stop() {
    this.httpServer.close()
  }

  start(): Promise<Server> {
    let self = this
    return new Promise(function(resolve, reject) {
      let app = koa()
      app.use(cors())
      let router = new RxRouter()

      app.use(router.routes())
      if (self.buildConfig.fileServerPath) {
        app.use(serve(self.buildConfig.fileServerPath))
      }

      let fn = app.callback()

      let httpServer = http.createServer(fn)
      let ioServer = io(httpServer)

      let client = self.getClient()

      u.visitServices(self.buildModel.serviceSpecs, {
        onService: function(service) {
          let proxy = mu.createRemoteProxy(service, client, router)
          self.services[service.name] = proxy
          createLocalProxy(ioServer, service, proxy)
        }
      })

      self.httpServer = httpServer
      httpServer.listen(self.buildConfig.middle.port, self.buildConfig.middle.host, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(self)
        }
      })
    })
  }
}
