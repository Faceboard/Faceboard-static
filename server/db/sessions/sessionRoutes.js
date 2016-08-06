var Session = require('./sessionModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || "KeYbOaRdCaT";

module.exports = {

  startSession: function (req, res) {
    var userId = jwt.decode(req.headers['x-access-token'], secret).id;

    Session.startSession(userId)
      .then(function(created) {
        res.sendStatus(created ? 201 : 'Session not Created');
      });
  },

};
