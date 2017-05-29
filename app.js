'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


app.get('/', (req, res) => {

  res.sendFile(__dirname +'/templates/index.html');

});

var io;

const server = app.listen(process.env.PORT || 80, () => {
  const port = server.address().port;
  console.log(`App listening on port ${port}`);
});
/*
io = require('socket.io')(server);

io.emit('some event', { for: 'everyone' });

io.on('connection',function(socket){

  io.emit('message', connMsage)

  socket.on('message', function(msg){
    msg.socketId = socket.id;
    console.log(msg);
    io.emit('message', msg)
  });
});
*/
module.exports = app;