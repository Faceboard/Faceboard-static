var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
})

app.listen(port, function() {
  console.log('Listening on', port);
});