'use strict'

let http  = require('http')
let io = require('socket.io')
let koa = require('koa')
let cors = require('koa-cors')
let Router = require('koa-router')
let koaBody = require('koa-body')()

let app = koa()
app.use(cors())

let router = new Router({})

router.get('register', koaBody, function* (next) {
  console.log('In register')
  console.log('Player name: ' + this.params.name)
  yield* next
})
router.get('incrementScore', koaBody, function* (next) {
  console.log('In increment score')
  console.log('Player name: ' + this.params.name)
  console.log('Increment: ' + this.params.increment)
  console.log('Object type: ' + this.params.objectType)
  yield* next
})

app.use(router.routes())

let fn = app.callback()

let httpServer = http.createServer(fn)
let ioServer = io(httpServer)

function emitRandomRank() {
  ioServer.emit('updateRanking', Math.floor(Math.random() * 10))
  setTimeout(emitRandomRank, 500)
}
setTimeout(emitRandomRank, 500)

httpServer.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Server running on http://localhost:8080')
  }
})
