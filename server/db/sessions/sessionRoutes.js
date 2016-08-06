var Session = require('./sessionModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || "KeYbOaRdCaT";

module.exports = {

  startSession: function (req, res) {
    var userId = jwt.decode(req.headers['x-access-token'], secret).id;
    var name = req.body.sessionName;
    Session.startSession(name, userId)
      .then(function(session) {
        res.json(session);
      });
  },

  // for this function to work need token from first user and a userId from second user
  inviteToSession: function (req, res) {
    var sesh = req.body.id;
    var secondUserId = req.body.secondId;

    Session.inviteToSession(sesh, secondUserId)
      .then(function(session) {
        res.json(session);
      });
  }
};
