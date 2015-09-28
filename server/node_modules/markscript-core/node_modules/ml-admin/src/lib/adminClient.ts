import {createDatabaseClient, ConnectionParams, Client} from 'marklogic'

export interface AdminConnectionParams {
  host?: string
  port?: number
  user?: string
  password: string
  authType?: string
  ssl?: string
  agent?: any
  database?: string
}

export function createAdminClient(connectionParams: AdminConnectionParams): Client {
  return createDatabaseClient({
    host: connectionParams.host,
    port: connectionParams.port === undefined ? 8001 : connectionParams.port,
    database: connectionParams.database || 'Documents',
    user: connectionParams.user === undefined ? 'admin' : connectionParams.user,
    password: connectionParams.password,
    authType: connectionParams.authType,
    ssl: connectionParams.ssl,
    agent: connectionParams.agent
  })
}
