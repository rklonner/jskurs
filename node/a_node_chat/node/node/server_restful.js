var fs = require( 'fs' );
var express = require( 'express' );
var bp = require( 'body-parser' );
var app = express();


var server = app.listen(26893, function() {
  console.log( 'Server gestartet. Port 26893' );
});

// CORS Header
app.use( function( request, response, next ) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
  next();
});
app.use( express.static( 'files' ) );
app.use( bp.urlencoded({ extended:true })); // POST Daten parsen

// RESTFUL
var getData = function( dataname, callback ) {
  var dataObj;
  console.log("Read file")
  fs.readFile( dataname+'.json', function(err,data) {
    try {

      dataObj = JSON.parse( data );
      callback( dataObj[ dataname ] );
    } catch(e) {
      callback( [] );
    }
  });
} // getData
var writeData = function( dataname, dataArray, callback ) {
  console.log("Write file")
  var dataObj = {};
  dataObj[ dataname ] = dataArray;
  fs.writeFile( dataname+'.json', JSON.stringify(dataObj),    callback );
} // writeData


app.get('/restful/elefanten', function(req, res) {
  console.log("GET all");
  getData('elefanten', function(alleElefanten) {
    res.send({elefanten:alleElefanten});
  });
});

app.get('/restful/elefanten/:id', function(req, res) {
  var id = req.params.id;
  console.log("GET id", id);
  getData('elefanten', function(alleElefanten) {
    res.send({elefanten:[alleElefanten[id]]});
  });
});

app.post('/restful/elefanten', function(req, res) {
  console.log("POST", req.body);
  getData('elefanten', function(alleElefanten) {
    alleElefanten.push(req.body);
    writeData('elefanten', alleElefanten, function() {
      res.send({result:true})
    })
  });
});

app.put('/restful/elefanten/:id', function(req, res) {
  var id = req.params.id;
  console.log("PUT id", id, req.body);
  getData('elefanten', function(alleElefanten) {
    alleElefanten[id] = req.body;
    writeData('elefanten', alleElefanten, function() {
      res.send({result:true})
    })
  });
});

app.delete('/restful/elefanten/:id', function(req, res) {
  var id = req.params.id;
  console.log("DELETE id", id)
  getData('elefanten', function(alleElefanten) {
    delete alleElefanten[id];  //delete setzt var auf undefined
    writeData('elefanten', alleElefanten, function() {
      res.send({result:true})
    })
  });
});
