var fs = require('fs');
var express = require('express');
var bp = require('body-parser');
var app = express();

var server = app.listen(5000, function() {
  console.log('Server gestartet. Post 5000');
});


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

// static files
app.use(express.static('files'));


app.get('/', function(req, res) {
  fs.readFile('vorlage.html', function(err, data) {
    //res.writeHead(200, {'Content-Type':'text/html'});
    res.status(200).end(data);
  });
});


app.post('/userverwaltung', function(req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end('OK');
});
