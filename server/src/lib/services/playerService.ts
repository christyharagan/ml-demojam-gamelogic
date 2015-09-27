import {mlService, mlMethod, mlEvent, resolve, AbstractMLService} from 'markscript-uservices'
import {Observable} from 'uservices'

enum ObjectType {
  ASTEROID,
  ENEMY_SHIP

}

@mlService('player')
export class PlayerService extends AbstractMLService {

  @mlMethod()
  register(name: string): Promise<boolean> {
    xdmp.documentInsert(`/players/${name}.json`, {
      score: 0,
      ranking: 0
    })
    return resolve(true)
  }

  @mlMethod()
  incrementScore(name: string, increment: number, objectType: ObjectType): Promise<boolean> {

  }

  @mlEvent({
    scope: '/players'
  })
  updateRanking(name:string): Observable<number> {
    return this.observableFactory().map(function(value: Doc<number>) {
      return [parseInt(value.uri.substring('/guesses/'.length)), value.content.root.count]
    })
  }

}
