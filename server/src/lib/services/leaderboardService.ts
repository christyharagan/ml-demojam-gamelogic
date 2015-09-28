import {mlService, mlEvent, mlMethod, AbstractMLService, Doc, resolve} from 'markscript-uservices'
import {Observable} from 'uservices'
import {Ranks} from '../models/scores'

@mlService('leaderboard')
export class LeaderboardService extends AbstractMLService {
  // @mlEvent({
  //   scope: '/players/'
  // })
  // updateLeaderboard(): Observable<Ranks> {
  //   return this.observableFactory().map(function(value: Doc<Counter>) {
  //     return [parseInt(value.uri.substring('/guesses/'.length)), value.content.root.count]
  //   })
  // }
}
