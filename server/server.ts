import {Server} from 'markscript-koa'
import {PlayerService} from './src/lib/services/playerService'

export function clear(server: Server) {
  let preperationService = <PlayerService>server.getService('player')
  return preperationService.prepare()
}

export function register(server: Server, name: string) {
  let playerService = <PlayerService>server.getService('player')
  return playerService.register(name)
}

export function incrementScore(server: Server, name: string, increment: number) {
  let playerService = <PlayerService>server.getService('player')
  return playerService.incrementScore(name, increment, 0)
}

export function updateRanking(server: Server) {
  let playerService = <PlayerService>server.getService('player')
  return playerService.updateRanking()
}
