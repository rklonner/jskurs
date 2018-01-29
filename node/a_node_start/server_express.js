var fs = require('fs');
var express = require('express');
var bp = require('body-parser');
var app = express();

var server = app.listen(5000, function() {
  console.log('Server gestartet. Post 5000');
});

// static files
app.use(express.static('files'));


app.get('/', function(req, res) {
  fs.readFile('vorlage.html', function(err, data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});

/*
app.get('/j', function(req, res) {
  fs.readFile('jquery-3.2.1.min.js', function(err, data) {
    res.writeHead(200, {'Content-Type':'text/javascript'});
    res.end(data);
  });
});
*/
