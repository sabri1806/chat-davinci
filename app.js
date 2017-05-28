// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// [START hello_world]
// Say hello!

app.get('/', (req, res) => {

  res.sendFile(__dirname +'/templates/index.html');

});

/*
app.get('/chat', (req, res) => {

  res.sendFile(__dirname +'/templates/login.html');
  
});

app.post('/join', function(req, res){

  console.log(req.body['chatroom']);
  res.sendFile(__dirname +'/templates/index.html');

})

*/
var io;
if (module === require.main) {
  // [START server]
  // Start the server
    const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
 io = require('socket.io')(server);

  // [END server]
}



/*broadcasting emite el evento del servidor 
al resto de los usuarios, aqui se setea que sea para todos*/
io.emit('some event', { for: 'everyone' });

/*
var groupChat1 = [];
groupChat1.push('juan');
groupChat1.push('pepe');*/

//var openSockets = [];


//aqui se imprime la salida del evento chat message
io.on('connection',function(socket){

  console.log('connection stablished...'+ socket.id);
 // openSockets.push(socket.id);
  var connMsage = {'socketId':socket.id};

  io.emit('message', connMsage)

  socket.on('message', function(msg){
  msg.socketId = socket.id;
  console.log(msg);
  io.emit('message', msg)
  });


});



module.exports = app;