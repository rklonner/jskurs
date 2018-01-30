//var fs = require( 'fs' );
var express = require( 'express' );
var socket = require('socket.io');
//var bp = require( 'body-parser' );
var app = express();


var server = app.listen(3333, function() {
  console.log( 'WIFI Secret Chat. Port 3333' );
});

app.use( express.static( 'files' ) );

app.get('/', function(req,res) {
  res.sendFile(__dirname+'/files/d14-chat.html')
});

var io = socket(server);

// eventlistener am server
var connectedUsers = {};
io.on('connection', function(socket) {
  console.log('Neuer Benutzer verbunden');
  socket.on('shout', function(data) {
    io.emit('servershout', data);
    connectedUsers[socket.id] = data.split(' ')[0];
    console.log(connectedUsers)
  });

  // recognise disconnection of user
  socket.on('disconnecting', function(reason) {
    var disconnectMsg = connectedUsers[socket.id]+" disconnected because of " + reason + "!";
    console.log(disconnectMsg)
    io.emit('servershout', disconnectMsg);
    delete connectedUsers[socket.id];
  });
});
