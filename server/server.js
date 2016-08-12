var express = require('express');
var path = require('path');
// var userRoutes = require('./db/users/userRoutes');
// var sessionRoutes = require('./db/sessions/sessionRoutes');
// var messageRoutes = require('./db/messages/messageRoutes');
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
  res.sendFile(path.join(__dirname + '/index.html'));
});

// app.post('/users/signup', userRoutes.signUp); // sign up, need unique username
// app.post('/users/signin', userRoutes.signIn); // sign in to get auth token
// app.get('/users/findCurrentUser', userRoutes.findOneUser); // find user by auth token (id)
// app.get('/users/findOne', userRoutes.findByUserId); // find user by sending id for that user
// app.get('/users/findall', userRoutes.findAll);  // find all users
// app.post('/users/update/:sessionid', userRoutes.updateSession); // finds a user to update session
// app.post('/session/start', sessionRoutes.startSession); // start session
// app.post('/session/addUser', sessionRoutes.inviteToSession); // invite another user to session
// app.get('/messages/findallMessages', messageRoutes.findAllMessages);  // find all messages
// app.post('/messages/newMessage', messageRoutes.newMessage);  // add a new message

db.sync().then(function () {
  server.listen(port, function() {
    console.log('listening to', port);
  });
});
