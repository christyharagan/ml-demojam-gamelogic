export interface RunOptions {
  database: {
    name: string
    host: string
    port: number
    user: string
    password: string
  }
  middle: {
    host: string
    port: number
    fileServerPath?: string
  }
}
