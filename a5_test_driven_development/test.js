QUnit.test('mein erster Test', function (assert) {
  assert.ok( 1 == '1', 'automatische Typumwandlung');
});

QUnit.test('Zahlen addieren', function(assert) {
  assert.ok(typeof addieren == 'function', 'Gitb es die Funktion "addieren"');
  assert.equal(addieren(1,2), 3, 'Zahlen addieren');
  assert.equal(addieren('1', '2'), 3, 'Addieren mit Typumwandlung');
  assert.equal(addieren('a','b'), 'ab', 'nicht numerische Werte verketten');
  assert.equal(addieren('1,5', 1.2), 2.7, 'Komma auch mit , erlauben');
  assert.equal(addieren(), 0, 'Funktion ohne Parameter');
});

QUnit.test('Objekte', function(assert) {
  assert.ok(typeof create == 'function', 'Gitb es die Funktion "create"');
  assert.deepEqual( create(1,2), {a:1,b:2}, 'Objekt erzeugt');
  assert.deepEqual( create(1,2,3), {a:1,b:2,c:3}, 'Objekt erzeugt');
});


// wenn ich jquery verwende muss man es testen
QUnit.test('Framework eingebunden', function(assert) {
  assert.ok(typeof jQuery == 'function', 'jQuery eingebunden');
});

// test setup html
QUnit.module('Setup HTML', {
  before:function(){
    var div = document.createElement('div');
    div.id = 'ausgabe';
    document.getElementById('qunit-fixture').appendChild(div);
  },
  after:function(){
    document.getElementById('qunit-fixture').innerHTML = '';
  }
})

QUnit.test("Summe mit Ausgabe", function(assert) {
  outputSumme(1,2);
  assert.equal(document.getElementById('ausgabe').innerHTML, '3', 'Ausgabe')
});



// asynchroner TEST
QUnit.test('asynchrones Script', function(assert) {
  var fertig = assert.async();
  verzoegert(function(antwort) {
    assert.equal(antwort, 'OK', 'asynchrones Ding tut');
    fertig();
  });
});
