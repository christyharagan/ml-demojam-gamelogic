Micro (u)Services - Socket.IO Server Proxies
==

Overview
--

Create remote proxies of [uServices](https://github.com/christyharagan/uservices) via socket.io. This package is for the server.

This is a fully-symmetric approach. In other words uServices on the server can be made available as remote proxies via the localProxy implementation.

Alternatively uServices on other tiers can be made available to the server via the remoteProxy implementation.

Usage
--

Install:
```
npm install uservices-socket.io.-server
```

Basic Usage: (see the uServices project for examples on how to create a uService spec)

```TypeScript
import {createLocalProxy} from 'uservices-socket.io-server'

let httpServer = http.createServer(fn)
let ioServer = io(httpServer)
createLocalProxy(ioServer, chatSpec, chatService)

```
