var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/db');
var http = require('http');

var app = express();
var server = http.createServer(app);

var port = process.env.PORT || 3000;
var io = require('socket.io').listen(server);
var nsp = io.of('/test');

require('./socket')(nsp);
require('./routes.js')(app, express);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

db.sync().then(function () {
  server.listen(port, function () {
    console.log('listening to', port);
  });
});
