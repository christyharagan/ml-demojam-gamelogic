'use strict'

let http  = require('http')
let io = require('socket.io')
let koa = require('koa')
let cors = require('koa-cors')
let Router = require('koa-router')
let koaBody = require('koa-body')()
let serve = require('koa-static')

let app = koa()
app.use(cors())

let router = new Router({})
interface Player {
  score: number
  ranking: number
}

let players:{[name:string]:Player} = {}
let ranks = <[string, number][]>[]

router.get('/register', koaBody, function* (next) {
  console.log('HI')
  players[this.params.name] = {
    score: 0,
    ranking: 1
  }
  updateRanks(this.params.name, 0, players[this.params.name])
  yield* next
})
router.get('/incrementScore', koaBody, function* (next) {
  let player = players[this.params.name]
  let score = player.score + this.params.increment
  player.score = score

  updateRanks(this.params.name, score, player)

  yield* next
})

app.use(router.routes())
app.use(serve('./www'))

let fn = app.callback()

let httpServer = http.createServer(fn)
let ioServer = io(httpServer)

function updateRanks(name:string, score:number, player:Player) {
  if (ranks.length === 0) {
    ranks.push([name, score])
    player.ranking = 1
  } else {
    let s = 0
    let i = 0
    while (i < ranks.length) {
      let r = ranks[i]
      let _name = r[0]
      let _score = r[1]
//      let [_name, _score] = ranks[i]
      if (name === _name) {
        delete ranks[i]
      } else {
        if (score >= _score) {
          ranks = ranks.splice(i, 0, [name, score])
          player.ranking = i + 1
          ioServer.emit('updateRanking', name, i + 1)
          ioServer.emit('leaderboard/updateRanking', name, i + 1)
        } else {
          players[_name].ranking = i + 1
          ioServer.emit('updateRanking', _name, i + 1)
          ioServer.emit('leaderboard/updateRanking', _name, i + 1)
        }
        i++
      }
    }
  }
}

// function emitRandomRank() {
//   ioServer.emit('updateRanking', Math.floor(Math.random() * 10))
//   setTimeout(emitRandomRank, 500)
// }
// setTimeout(emitRandomRank, 500)

httpServer.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Server running on http://localhost:8080')
  }
})
