var express = require('express');
var app = express();
// donne une id aléatoire 
// permet sur la page de voir qui à envoier la valeur aléatoire
var id = Math.floor(Math.random() * 1000);

//envoie une valeurs en JSON
app.get('/', function (req, res) {
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify("num: " + Math.floor(Math.random() * 1000) + " id: " + id),null, 3);
});

//écoute  les requêtes au port 80
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
});