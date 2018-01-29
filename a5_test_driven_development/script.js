document.write('<script src="jquery-3.2.1.min.js"></script>');


var convertNumberWithCommaToFloat = function(x) {
  if (typeof x == 'string') {
    if (x.search(',') > -1) {
      result = Number.parseFloat(x.replace(',','.'));
    }
    else {
      result = Number.parseFloat(x);
    }
  }
  else {
    result = x;
  }
  return result;
}


var addieren = function(x,y) {
  if (typeof x == 'undefined' || typeof y == 'undefined') {
    result = 0;
  }
  else if ($.isNumeric(x) && $.isNumeric(y)) {
    result = Number.parseFloat(x) + Number.parseFloat(y);
  }
  else if ((x.search(',') > -1) || (y.search(',') > -1)) {
    result = convertNumberWithCommaToFloat(x) + convertNumberWithCommaToFloat(y);
  }
  else {
    result = x + y;
  }

  return result
};


var create = function() {
  var o = {};
  var indexe = "abcdefghijk";
  for (var i=0;i<arguments.length;i++) {
    o[indexe[i]] = arguments[i];
  }
  return o
};


var outputSumme = function(a,b) {
  document.getElementById('ausgabe').innerHTML = addieren(a,b);
};

var verzoegert = function(callback) {
  setTimeout(function() {
    callback('OK');
  }, 1000);
};
