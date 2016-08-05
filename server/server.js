var express = require('express');
var path = require('path');
var userRoutes = require('./db/users/userRoutes');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('/server/index.html', { root: __dirname });
})

app.post('/signup', userRoutes.signUp);

app.listen(port, function() {
  console.log('Listening on', port);
});

