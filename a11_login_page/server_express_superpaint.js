var fs = require( 'fs' );
var express = require( 'express' );
var bp = require( 'body-parser' );
var app = express();

var server = app.listen(20001, function() {
  console.log( 'Server gestartet. Port 20001' );
});

// Damit alle Zuggreifen können
app.use( function( request, response, next ) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET', 'POST' );
  next();
});

var writeData = function(dataArray, callback ) {
  var dataObj = {};
  dataObj = dataArray;
  fs.writeFile( 'user_superpaint.json', JSON.stringify(dataObj), callback );
} // writeData

// im Ordner node/files liegen die Dateien
//app.use( express.static( 'files' ) );

app.use( bp.urlencoded({ extended:true })); // POST Daten parsen

app.get( '/', function(request, response) {
  fs.readFile( 'test.html', function(err,data) {
    response.status(200).end( data );
  })
});

var getAllUsers = function( callback ) {
  fs.readFile( 'user_superpaint.json', function(err,data) {
    console.log("Lese file");
    try {
      console.log( 1 )
      callback( JSON.parse( data ) );
    } catch(e) {
      console.log( e )
      callback( {user:[]} );
    }
  });
}

/*
app.post('/userverwaltung', function( request, response) {

  fs.readFile( 'user.json', function(err,data) {
    var userdaten = JSON.parse( data );
    console.log( userdaten );
    console.log( request.body.uname );
    userdaten.user.push( request.body.uname );
    fs.writeFile( 'user.json', JSON.stringify(userdaten), function(err,data) {
      response.writeHead( 200, {'Content-Type':'text/html'} );
      response.status(200).end( 'OK' );
    });
  });
});
*/

app.get( '/login', function(request,response ) {
  getAllUsers( function( userdaten ) {
    console.log( 'Userdaten: ' + JSON.stringify(userdaten.user));
    console.log(userdaten.user.length)
    //console.log( 'Username Client: ' + request.body.username );
    //console.log( 'Password Client: ' + request.body.password );
    //for (request.body.username in userdaten.user.username) {

    //var username = 'r.klonner@gmx.at';
    //var password = '12345';
    var status;
    for ( var i=0; i<userdaten.user.length; i++) {
      if ((userdaten.user[i].username == request.body.username) &&
          (userdaten.user[i].password == request.body.password)) {
      //if ((userdaten.user[i].username == username) &&
      //    (userdaten.user[i].password == password)) {
        status = true;
        break;

      } else {
        status = false;
      }
    }
  response.send( status );
  });
});


app.post( '/addimage', function( request, response ) {
  console.log( 'POST', request.body );
  getAllUsers( function( userdaten ) {
    //var userName = 'r.klonner@gmx.at';
    //var userName = 'gerald';
    //var imageString = 'asd123123fasd';
    for ( var i=0; i<userdaten.user.length; i++) {
      if (userdaten.user[i].username == request.body.userName) {
        userdaten.user[i].images.push(request.body.imageString);
        console.log(userdaten.user[i].images);
        writeData(userdaten, function() {
          response.send( {result:true} );
        });
      }
    }
  });
});


app.get( '/readimage', function( request, response ) {
  getAllUsers( function( userdaten ) {
    //var userName = 'r.klonner@gmx.at';
    //var userName = 'gerald';
    //var imageString = 'asd123123fasd';
    for ( var i=0; i<userdaten.user.length; i++) {
      if (userdaten.user[i].username == request.body.userName) {

        //userdaten.user[i].images.push(request.body.imageString);
        console.log(userdaten.user[i].images);
        response.send( {result:JSON.stringify(userdaten.user[i].images)} );
      }
    }
  });
});
