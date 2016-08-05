var Session = require('./sessionModel');

module.exports = {

  startSession: function (req, res) {
    var username = req.body.username;

    Session.startSession(username)
      .then(function(created) {
        res.sendStatus(created ? 201 : 'Session not Created');
      });
  },

};
