var path = require('path');
var io = require('socket.io');
var http = require('http');
var mu = require('markscript-uservices');
var u = require('uservices');
var RxRouter = require('koa-rx-router');
var uservices_socket_io_server_1 = require('uservices-socket.io-server');
var ml_admin_1 = require('ml-admin');
var fs = require('fs');
var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');
var cors = require('koa-cors');
var Server = (function () {
    function Server(options) {
        this.services = {};
        this.options = options;
        if (!options.serviceSpecs) {
            if (!options.pkgDir) {
                throw new Error('To run markscript-koa, you must provide either service-specs, or a package directory with a service-specs.json');
            }
            if (fs.existsSync(path.join(options.pkgDir, 'deployed', 'service-specs.json'))) {
                options.serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'deployed', 'service-specs.json')).toString());
            }
            else if (fs.existsSync(path.join(options.pkgDir, 'service-specs.json'))) {
                options.serviceSpecs = u.parse(fs.readFileSync(path.join(options.pkgDir, 'service-specs.json')).toString());
            }
            else {
                throw new Error('To run markscript-koa, you must provide either service-specs, or a package directory with a service-specs.json');
            }
        }
    }
    Server.prototype.getService = function (name) {
        return this.services[name];
    };
    Server.prototype.stop = function () {
        this.httpServer.close();
    };
    Server.prototype.start = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var app = koa();
            app.use(cors());
            var router = new RxRouter();
            app.use(router.routes());
            if (self.options.fileServerPath) {
                app.use(serve(self.options.fileServerPath));
            }
            var fn = app.callback();
            var httpServer = http.createServer(fn);
            var ioServer = io(httpServer);
            var mlClient = ml_admin_1.createAdminClient({
                port: self.options.database.port,
                host: self.options.database.host,
                password: self.options.database.password,
                user: self.options.database.user,
                database: self.options.database.databaseName
            });
            u.visitServices(self.options.serviceSpecs, {
                onService: function (service) {
                    var proxy = mu.createRemoteProxy(service, mlClient, router);
                    self.services[service.name] = proxy;
                    uservices_socket_io_server_1.createLocalProxy(ioServer, service, proxy);
                }
            });
            self.httpServer = httpServer;
            httpServer.listen(self.options.middle.port, self.options.middle.host, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(self);
                }
            });
        });
    };
    return Server;
})();
exports.Server = Server;
//# sourceMappingURL=server.js.map