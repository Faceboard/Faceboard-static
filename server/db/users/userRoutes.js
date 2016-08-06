var User = require('./userModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || "KeYbOaRdCaT";

module.exports = {

  signIn: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.signIn(username, password)
      .then(function (foundUser) {
        if (!foundUser) {
          res.sendStatus(401, 'user is not valid');
        } else {
          var token = jwt.encode(foundUser, secret);
          res.json({token: token});
        }
      });
  },

  signUp: function (req, res) {

    var name = req.body.username;
    var password = req.body.password;

    User.signUp(name, password)
      .then(function (created) {
        res.sendStatus(created ? 201 : 401);
      });
  },

  findOneUser: function (req, res) {
    var userId = jwt.decode(req.headers['x-access-token'], secret).id;

    User.findById(userId)
      .then(function(user) {
        res.json(user);
      });
  },

  updateSession: function (req, res) {
    // gives userid
    var userId = jwt.decode(req.headers['x-access-token'], secret).id;
    var sessionId = req.params.sessionid;

    User.updateSession(userId, sessionId)
      .then(function() {
        res.sendStatus(201, 'User session updated'); // need to find working status code for updates
      });
  }
};
