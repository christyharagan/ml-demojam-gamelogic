import * as s from '../../server'
import {Server} from 'markscript-koa'

function printValue(answerId) {
  return function(value) {
    console.log('Submitted answerId ' + answerId + ': ' + value)
    return
  }
}

export function test(server: Server) {
  return s.clear(server).then(function() {
    return s.register(server, 'christy')
  }).then(function() {
    return s.register(server, 'katy')
  }).then(function() {
    s.updateRanking(server).subscribe({
      onNext: function(result) {
        console.log('Updated result:')
        console.log(JSON.stringify(result))
      }, onError: function(e) {
        console.log(e)
        console.log(e.stack)
      }, onCompleted: function() {
        throw 'UpdateResults Should never complete'
      }
    })

    return s.incrementScore(server, 'christy', 5)
  }).then(function() {
    return s.incrementScore(server, 'katy', 6)
  }).then(function() {
    return s.incrementScore(server, 'katy', 6)
  }).then(function() {
    return s.incrementScore(server, 'christy', 12)
  }).then(function() {
    process.exit()
  }).catch(function(e) {
    console.log(e)
    console.log(e.stack)
    process.exit()
  })
}
