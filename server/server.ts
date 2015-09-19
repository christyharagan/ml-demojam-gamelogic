import {Server} from 'markscript-koa'
import {PlayService} from './lib/services/playService'
import {PreperationService} from './lib/services/preperationService'
import {Answer} from './lib/models/answer'
import {Statement} from './lib/models/statement'
import {ResultsService} from './lib/services/resultsService'

export function clear(server: Server) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.clear()
}

export function loadAnswers(server: Server, answers: Answer[]) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.loadAnswers(answers)
}

export function loadPremises(server: Server, premises: Statement[]) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.loadPremises(premises)
}

export function getAnswers(server: Server) {
  let playService = <PlayService>server.getService('play')
  return playService.getPossibleAnswers()
}

export function submitAnswer(server: Server, answerId: number) {
  let playService = <PlayService>server.getService('play')
  return playService.submitAnswer(answerId)
}

export function getPremises(server: Server) {
  let playService = <PlayService>server.getService('play')
  return playService.getPremises()
}

export function getResults(server: Server) {
  let resultsService = <ResultsService>server.getService('results')
  return resultsService.getResults()
}

export function updateResults(server: Server) {
  let resultsService = <ResultsService>server.getService('results')
  return resultsService.updateResults()
}
