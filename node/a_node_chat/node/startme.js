"use strict"

var fs = require('fs');
var cp = require('child_process');

var serverFile = 'chat.js';

// subprocess starten
var server = cp.fork(serverFile);
console.log('serverscript gestartet');

fs.watchFile(serverFile, function() {
  server.kill();
  console.log("Serverscript beendet");
  server = cp.fork(serverFile);
  console.log('serverscript gestartet');
});
