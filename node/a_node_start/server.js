console.log('hello world');

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  console.log('Request an Server ' + req.url);
  res.writeHead(200, {'Content-Type': 'text/html'});

  var file = 'vorlage.html';
  if (req.url == '/j') {
    file = 'jquery-3.2.1.min.js';
  }

  fs.readFile(file, function(err, data) {
    res.end(data);
  });

}).listen(8000);
console.log('Server läuft http://localhost:8000');
