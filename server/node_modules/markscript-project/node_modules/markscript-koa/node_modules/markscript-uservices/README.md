MarkScript uServices Library
==

Overview
--

Deploy remote proxies of [uServices](https://github.com/christyharagan/uservices) from Marklogic.

Usage
--

Install:
```
npm install markscript-uservices
```

Basic Usage:

To use this as part of a MarkScript build, add this property to the root of your build options:

```TypeScript
import {UServicesPlugin} from 'markscript-uservices'

let buildOptions = {
  plugins: {
    uservices: [UServicesPlugin, {}]
  }
  // etc
}
```

For a uService on Marklogic:

```TypeScript
import * as mu from 'markscript-uservices'
import {Observable} from 'uservices'
import {Message} from '../common/models/message'
import {ChatService} from '../common/services/chatService'

@mu.mlService()
export class ChatService extends extends mu.AbstractMLService {
  @mu.mlMethod({
    method: 'put'
  })
  sendMessage(message: Message): Promise<boolean> {
    xdmp.documentInsert('/chatMessages/' + message.timestamp, message)
    resolve(true)
  }

  @mu.mlEvent({
    states: ['create', 'modify'],
    scope: '/chatMessages/'
  })
  messageBroadcast(): Observable<Message> {
    return this.observableFactory().map(function(doc: Doc<Message>{
      return doc.value
    })
  }
}

```

Then to proxy that to another tier:

```TypeScript
import {createRemoteProxy} from 'markscript-uservices'
import * as RxRouter from 'koa-rx-router'

let router = new RxRouter()
let chatService = createRemoteProxy(chatSpec, client, router)
```
