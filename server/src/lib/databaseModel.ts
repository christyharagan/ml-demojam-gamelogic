import {ServerSpec, DatabaseSpec, mlDeploy, contentDatabase, triggersDatabase, modulesDatabase, schemaDatabase, mlRuleSet, BuildOptions} from 'markscript-core'
import {buildOptions} from '../../markscriptfile'

@mlDeploy()
export class MLGamescriptDemo {
  name: string
  host: string
  port: number

  constructor(name: string, host: string, port: number) {
    this.name = name
    this.host = host
    this.port = port
  }

  get server(): ServerSpec {
    return {
      name: this.name,
      host: this.host,
      port: this.port
    }
  }

  @contentDatabase()
  get contentDatabase(): DatabaseSpec {
    return {
      name: this.name + '-content'
    }
  }

  @triggersDatabase()
  get triggersDatabase(): DatabaseSpec {
    return {
      name: this.name + '-triggers'
    }
  }

  @modulesDatabase()
  get modulesDatabase(): DatabaseSpec {
    return {
      name: this.name + '-modules'
    }
  }

  @schemaDatabase()
  get schemaDatabase(): DatabaseSpec {
    return {
      name: this.name + '-schema'
    }
  }
}
