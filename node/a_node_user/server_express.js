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

app.use(bp.urlencoded({extended:true})); // POST Daten parsen

app.get('/', function(req, res) {
  fs.readFile('vorlage.html', function(err, data) {
    //res.writeHead(200, {'Content-Type':'text/html'});
    res.status(200).end(data);
  });
});


app.post('/userverwaltung', function(req, res) {
  fs.readFile('user.json', function(err, data) {
    var userdaten = JSON.parse(data);
    console.log(userdaten);
    console.log(req.body.uname)
    userdaten.user.push(req.body.uname);
    fs.writeFile('user.json', JSON.stringify(userdaten), function() {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('OK');
    });
  });
});

app.get('/userverwaltung', function(req, res) {
  fs.readFile('user.json', function(err, data) {
    var userdaten = JSON.parse(data);
    //res.writeHead(200, {'Content-Type': 'JSON'});
    //res.end(JSON.stringify(userdaten));
    res.send(userdaten);  // express
  });
});
