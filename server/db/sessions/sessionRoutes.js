var Session = require('./sessionModel');

module.exports = {

  start: function (req, res) {

    var username = req.body.username;

    Session.start(username)
      .then(function(created) {
        res.sendStatus(created ? 201 : 'Session not Created');
      });
  }

};
