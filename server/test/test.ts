import {Runtime} from 'markscript-koa'

function printValue(answerId) {
  return function(value) {
    console.log('Submitted answerId ' + answerId + ': ' + value)
    return
  }
}

export function test(runtime: Runtime) {
  let playerService = <GameLogic.PlayerService>runtime.getService('player')
  return playerService.prepare().then(function(){
    playerService.register('christy')
  }).then(function() {
    return playerService.register('katy')
  }).then(function() {
    playerService.updateRanking().subscribe({
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

    return playerService.incrementScore('christy', 5, 0)
  }).then(function() {
    return playerService.incrementScore('katy', 6, 0)
  }).then(function() {
    return playerService.incrementScore('katy', 6, 0)
  }).then(function() {
    return playerService.incrementScore('christy', 12, 0)
  })
}
