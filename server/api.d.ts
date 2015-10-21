declare module GameLogic {
  interface Ranks {
    ranks: [string, number][]
  }

  interface PlayerService {
    prepare(): Promise<boolean>

    register(name: string): Promise<boolean>

    incrementScore(name: string, increment: number, objectType: ObjectType): Promise<boolean>

    updateRanking(): Observable<[string, number][]>
  }
}
