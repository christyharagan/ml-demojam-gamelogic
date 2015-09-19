Overview
--

Check out this project, then use the mockServer folder for testing the server API.

*Note*: I have added a client folder if you'd like to commit your changes there, so we have a single repository for all the code. Email me your github ID and I'll add you as a committer.

Install and Run
--

You will need to be running a modern version of Node.JS (v4 or newer). iojs v3 should work, but I haven't tested it.

To install the mock server (from the mockServer folder):

```npm install```

To run the mock server (from the mockServer folder):

```npm run run```

API
--

For push I am using Socket.IO. Socket.IO is a wrapper around WebSockets that provides a number of benefits including downgrading to HTTP Push if WebSockets aren't available, and things like auto-reconnect if the connection is lost.

I have found a C# (with Unity3D support) library for Socket.IO here: https://github.com/Quobject/SocketIoClientDotNet

The API is:

* POST http://localhost:8080/playerService/register?name=STRING

* POST http://localhost:8080/playerService/incrementScore?name=STRING&increment=number&objectType=0|1
  * For objectType 0=ASTEROID, 1=ENEMY_SHIP

* SOCKET.IO listen to: /updateRanking
  * Receive ranking:number

Test
--

For the POST methods, I'm just using ```console.log``` to test. It prints the expected parameters and name of method being called. Check the console to ensure you are received expected values

For the SOCKET.IO method, I'm just pushing a random number through every half a second
