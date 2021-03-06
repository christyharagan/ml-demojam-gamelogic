import {Observable, mlService, mlMethod, mlEvent, resolve, AbstractMLService, Doc, METHOD} from 'markscript-uservices'
import {deleteAll} from 'markscript-basic'

enum ObjectType {
  ASTEROID,
  ENEMY_SHIP
}

interface Player {
  score: number
  ranking: number
}

@mlService('player')
export class PlayerService extends AbstractMLService implements GameLogic.PlayerService {

  @mlMethod({method: METHOD.PUT})
  prepare(): Promise<boolean> {
    deleteAll('/players')

    xdmp.documentInsert(`/ranking/players.json`, {
      ranks: []
    })

    return resolve(true)
  }

  @mlMethod({method: METHOD.PUT})
  register(name: string): Promise<boolean> {
    xdmp.documentInsert(`/players/${name}.json`, {
      score: 0,
      ranking: 0
    })
    return resolve(true)
  }

  @mlMethod({method: METHOD.PUT})
  incrementScore(name: string, increment: number, objectType: ObjectType): Promise<boolean> {
    let player = <Player>cts.doc(`/players/${name}.json`).root.toObject()

    let score = player.score + increment
    player.score = score

    let ranks = (<GameLogic.Ranks>cts.doc(`/ranking/players.json`).root.toObject()).ranks

    if (ranks.length === 0) {
      ranks = [[name, score]]
      player.ranking = 1
    } else {
      let i = 0
      while (i < ranks.length) {
        let [_name, _score] = ranks[i]
        if (name === _name) {
          delete ranks[i]
        } else {
          if (score >= _score) {
            ranks = ranks.splice(i, 0, [name, score])
          }
          i++
        }
      }
    }

    xdmp.documentInsert(`/ranking/players.json`, {
      ranks: ranks
    })

    return resolve(true)
  }

  @mlEvent({
    scope: '/ranking'
  })
  updateRanking(): Observable<[string, number][]> {
    return this.observableFactory().map(function(value: Doc<GameLogic.Ranks>) {
      return value.content.root.ranks
    })
  }

}
