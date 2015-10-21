import {mlDeploy, contentDatabase, triggersDatabase, modulesDatabase, schemaDatabase} from 'markscript-basic-build'

@mlDeploy()
export class GameLogicDatabase {
  name: string
  host: string
  port: number

  constructor(name: string, port: number, host?: string) {
    this.name = name
    this.host = host
    this.port = port
  }

  get server(): MarkScript.ServerSpec {
    return {
      name: this.name,
      host: this.host,
      port: this.port
    }
  }

  @contentDatabase()
  get contentDatabase(): MarkScript.DatabaseSpec {
    return {
      name: this.name + '-content'
    }
  }

  @triggersDatabase()
  get triggersDatabase(): MarkScript.DatabaseSpec {
    return {
      name: this.name + '-triggers'
    }
  }

  @modulesDatabase()
  get modulesDatabase(): MarkScript.DatabaseSpec {
    return {
      name: this.name + '-modules'
    }
  }

  @schemaDatabase()
  get schemaDatabase(): MarkScript.DatabaseSpec {
    return {
      name: this.name + '-schema'
    }
  }
}
