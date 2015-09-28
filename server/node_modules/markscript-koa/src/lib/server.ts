import * as path from 'path'
import * as io from 'socket.io'
import * as http from 'http'
import * as mu from 'markscript-uservices'
import * as u from 'uservices'
import * as RxRouter from 'koa-rx-router'
import {createLocalProxy} from 'uservices-socket.io-server'
import {createAdminClient} from 'ml-admin'
import {Client} from 'marklogic'
import * as fs from 'fs'

let koa = require('koa')
let serve = require('koa-static')
let mount = require('koa-mount')
let cors = require('koa-cors')

export interface RunOptions {
  database: {
    databaseName: string
    host: string
    port: number
    user: string
    password: string
  }
  middle: {
    host: string
    port: number
  }
  pkgDir?: string
  serviceSpecs?: mu.MLServices
  fileServerPath?: string
}

export class Server {
  private options: RunOptions
  private services: { [name: string]: any } = {}
  private httpServer: http.Server

  getService<T>(name: string): T {
    return this.services[name]
  }

  constructor(options: RunOptions) {
    this.options = options
    if (!options.serviceSpecs) {
      if (!options.pkgDir) {
        throw new Error('To run markscript-koa, you must provide either service-specs, or a package directory with a service-specs.json')
      }
      if (fs.existsSync(path.join(options.pkgDir, 'deployed', 'service-specs.json'))) {
        options.serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'deployed', 'service-specs.json')).toString())
      } else if (fs.existsSync(path.join(options.pkgDir, 'service-specs.json'))) {
        options.serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'service-specs.json')).toString())
      } else {
        throw new Error('To run markscript-koa, you must provide either service-specs, or a package directory with a service-specs.json')
      }
    }
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
      if (self.options.fileServerPath) {
        app.use(serve(self.options.fileServerPath))
      }

      let fn = app.callback()

      let httpServer = http.createServer(fn)
      let ioServer = io(httpServer)

      let mlClient = createAdminClient({
        port: self.options.database.port,
        host: self.options.database.host,
        password: self.options.database.password,
        user: self.options.database.user,
        database: self.options.database.databaseName
      })

      u.visitServices(self.options.serviceSpecs, {
        onService: function(service) {
          let proxy = mu.createRemoteProxy(service, mlClient, router)
          self.services[service.name] = proxy
          createLocalProxy(ioServer, service, proxy)
        }
      })

      self.httpServer = httpServer
      httpServer.listen(self.options.middle.port, self.options.middle.host, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(self)
        }
      })
    })
  }
}
