'use strict';
var http = require('http');
var io = require('socket.io');
var koa = require('koa');
var cors = require('koa-cors');
var Router = require('koa-router');
var koaBody = require('koa-body')();
var app = koa();
app.use(cors());
var router = new Router({});
router.get('register', koaBody, function (next) {
    console.log('In register');
    console.log('Player name: ' + this.params.name);
    yield* next;
});
router.get('incrementScore', koaBody, function (next) {
    console.log('In increment score');
    console.log('Player name: ' + this.params.name);
    console.log('Increment: ' + this.params.increment);
    console.log('Object type: ' + this.params.objectType);
    yield* next;
});
app.use(router.routes());
var fn = app.callback();
var httpServer = http.createServer(fn);
var ioServer = io(httpServer);
function emitRandomRank() {
    ioServer.emit('updateRanking', Math.floor(Math.random() * 10));
    setTimeout(emitRandomRank, 500);
}
setTimeout(emitRandomRank, 500);
httpServer.listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server running on http://localhost:8080');
    }
});
//# sourceMappingURL=server.js.map