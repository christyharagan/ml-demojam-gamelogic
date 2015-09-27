import {mlService, mlEvent, mlMethod, AbstractMLService, Doc, resolve} from 'markscript-uservices'
import {Observable} from 'uservices'

@mlService('leaderboard')
export class LeaderboardService extends AbstractMLService {
  @mlEvent({
    scope: '/players/'
  })
  updateLeaderboard(): Observable<ResultUpdates> {
    return this.observableFactory().map(function(value: Doc<Counter>) {
      return [parseInt(value.uri.substring('/guesses/'.length)), value.content.root.count]
    })
  }
}
