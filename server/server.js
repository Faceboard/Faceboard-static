var express = require('express');
var path = require('path');
var userRoutes = require('./db/users/userRoutes');
var sessionRoutes = require('./db/sessions/sessionRoutes');
var bodyParser = require('body-parser');
var db = require('./db/db');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('/index.html', { root: __dirname });
})

app.post('/signup', userRoutes.signUp);
app.post('/signin', userRoutes.signIn);
app.get('/findUser', userRoutes.findOneUser);
app.post('/user/update/:sessionid', userRoutes.updateSession);
app.post('/session/start', sessionRoutes.startSession);
app.post('/session/addUser', sessionRoutes.inviteToSession);

db.sync().then(function () {
  server.listen(port, function() {
    console.log('listening to', port);
  });
});
