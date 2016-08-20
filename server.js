var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./server/db/db');
var http = require('http');
var os = require('os');

var app = express();
var server = http.createServer(app);

var port = process.env.PORT || 3000;
var io = require('socket.io').listen(server);
var nsp = io.of('/test');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');

require('./server/socket')(nsp);
require('./server/routes.js')(app, express);

app.get('/', function(req, res) {
  res.render('index');
});

db.sync().then(function () {
  server.listen(port, function () {
    console.log('listening to', port);
  });
});
