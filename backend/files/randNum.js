var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(Math.floor(Math.random() * 1000)),null, 3);
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
});