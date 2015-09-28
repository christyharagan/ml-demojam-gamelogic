MarkScript Koa Server
==

Overview
--

Provides an easy to use, already configured, koa server for MarkScript projects.

Given a MarkScript uServices spec, this will automatically proxy those uServices via socket.io for a client to consume.

Also provides easy static file sharing.

Usage
--

Install:
```
npm install markscript-koa
```

Basic Usage:

```TypeScript

import {Server} from 'markscript-koa'

let server = new Server({
  database: {
    databaseName: 'content',
    host: 'localhost',
    port: 8005,
    user: 'myUser',
    password: 'password'
  }, middle: {
    host: 'localhost',
    port: 8080
  },
  serviceSpecs: serviceSpecs,
  fileServerPath: './www'
})
server.start()


```
