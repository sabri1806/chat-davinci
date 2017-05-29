'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var io;

const server = require('http').createServer(app);//app.listen(process.env.PORT || 8081, () => {

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/index.html');
});

server.listen(app.get('port'), app.get('ipaddr'), function(){
  console.log('Express server listening on  IP: ' + app.get('ipaddr') + ' and port ' + app.get('port'));
});

 /* const port = server.address().port;
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