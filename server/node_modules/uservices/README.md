Remotable Micro (u)Services
==

Overview
--

A uService is just an object with asynchronous functions (returning either Promises or Observables). Functions returning Promises are referred to as methods, and functions returning Observables (which must currently be compatible with [rxjs](https://github.com/Reactive-Extensions/RxJS)) are referred to as events.

This library defines a specification that allows easy creation of proxies of these uServices, e.g. for remote use.

This specification is just a JSON format, which can be either created directly, or generated from code analysis. The example provided below uses the [typescript-schema](https://github.com/christyharagan/ts-schema) library to analyse TypeScript code in order to output a corresponding specification.

Moreover, this specification format is extensible. For example, the [markscript-uservices](https://github.com/christyharagan/markscript-uservices) library extends this to allow uServices to be implemented in, or proxies deployed to, a [MarkLogic](www.marklogic.com) server.

A javascript model of a spec can be found under the model module in this library, and allows for easy programmatic usage of a spec.

A number of libraries also provide abstractions over various transports to easily create remote proxies for uServices; some of these are listed at the end.

Usage
--

Install:
```
npm install uservices
```

Basic Usage:

An example specification: (All fields are optional)
```
{
  "myService": {
    "implementation": {
      "moduleName": "my/javascript/module",
      "className": "MyService"
    },
    "methods": {
      "someMethod": {
        "type": {}
      }
    },
    "events": {
      "someEvent": {}
    }
  }
}
```

To parse a JSON spec into a javascript model:
```TypeScript
import * as u from 'uservices'

let someSpecJSON

let spec = u.parse(someSpecJSON)
```

To easily navigate a specification (javascript model):
```TypeScript
import * as u from 'uservices'

let someSpec

u.visitServices(someSpec, {
  onService: function(serviceSpec){
    return {
      onMethod: function(methodSpec){
        let name = methodSpec.name
      },
      onEvent: function(eventSpec){
        let name = eventSpec.name
      }
    }
  }
})
```

To generate a spec from a typescript-schema model:

```TypeScript
import * as u from 'uservices'
import * as s from 'typescript-schema'

let module:s.Map<s.Module>

let specs = u.generateServiceSpecs(modules)
```

Remote Proxy libraries
--

Various libraries exist for making the services deployable as remote proxies. Some of them are listed below:

 - [Socket.io on the server](www.github.com/christyharagan/uservice-socket.io-server)
 - [Socket.io on the client](www.github.com/christyharagan/uservice-socket.io-client)
 - [Marklogic database](www.github.com/christyharagan/markscript-uservices)
