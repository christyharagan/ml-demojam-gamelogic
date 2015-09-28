'use strict';
let http = require('http');
let io = require('socket.io');
let koa = require('koa');
let cors = require('koa-cors');
let Router = require('koa-router');
let koaBody = require('koa-body')();
let serve = require('koa-static');
let app = koa();
app.use(cors());
let router = new Router({});
let players = {};
let ranks = [];
router.get('/register/:name', koaBody, function* (next) {
  console.log('sdfjsdfd')
    players[this.params.name] = {
        score: 0,
        ranking: 1
    };
    ranks.push([this.params.name, 0])
    ioServer.emit('updateRanking', [this.params.name, ranks.length]);
    ioServer.emit('leaderboard/updateRanking', [ranks]);
    //updateRanks(this.params.name, 0, players[this.params.name]);
    //console.log(this)
    //console.log(players)
    yield* next;
});
router.get('/incrementScore/:name/:increment', koaBody, function* (next) {
    let increment = parseInt(this.params.increment)
    let player = players[this.params.name];
    let score = player.score + increment;
    player.score = score;
    updateRanks(this.params.name, score, player);
    yield* next;
});
app.use(router.routes());
app.use(serve('./www'));
let fn = app.callback();
let httpServer = http.createServer(fn);
let ioServer = io(httpServer);
function updateRanks(name, score, player) {
    if (ranks.length === 0) {
        ranks.push([name, score]);
        player.ranking = 1;
    }
    else {
        let s = 0;
        let i = 0;
        let inserted = false
        while (i < ranks.length) {
            let r = ranks[i];
            console.log(ranks)
            console.log(r)
            let _name = r[0];
            let _score = r[1];
            if (name === _name) {
              if (inserted || i + 1 < ranks.length){//(ranks.length > 1) {
                ranks.splice(i, 1);
              } else {
                r[1] = score;
                player.ranking = i + 1;
                ioServer.emit('updateRanking', [name, i + 1]);
                i++
              }
            }
            else {
                if (score > _score && !inserted) {
                  inserted = true
                    ranks.splice(i, 0, [name, score]);
                    player.ranking = i + 1;
                    ioServer.emit('updateRanking', [name, i + 1]);
                }
                else {
                    players[_name].ranking = i + 1;
                    ioServer.emit('updateRanking', [_name, i + 1]);
                }
                i++;
            }
        }
        ioServer.emit('leaderboard/updateRanking', [ranks]);
    }
}

// ioServer.on('leaderboard/updateRanking', function(args: any[], cb: (id: string) => void) {
//   let id = String(Date.now())
//   socket.once('leaderboard/updateRanking' + id, function() {
//     let observable = <Observable<any>>event.apply(service, args)
//     observable.subscribe(
//       function(value) {
//         socket.emit('leaderboard/updateRanking' + id, [value])
//       },
//       function(error) {
//         socket.emit('leaderboard/updateRanking' + id, [null, error])
//       },
//       function() {
//         socket.emit('leaderboard/updateRanking' + id)
//       }
//     )
//   })
//   cb(id)
// })


httpServer.listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server running on http://localhost:8080');
    }
});
//# sourceMappingURL=index.js.map
