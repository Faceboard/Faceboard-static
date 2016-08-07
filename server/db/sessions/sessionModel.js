var Sequelize = require('sequelize');
var db = require('../db');
var User = require('../users/userModel');

var Session = db.define('session', {
  sessionName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  userOneid: Sequelize.INTEGER,
  userTwoid: Sequelize.INTEGER
});

Session.startSession = function(sessionName, userId) {
  return Session.create({sessionName: sessionName, userOneid: userId})
    .then(function(session) {
      return session;
    });
};

Session.inviteToSession = function(sessionId, invitedUserId) {
  return Session.findById(sessionId)
    .then(function(session) {
      session.userTwoid = invitedUserId;
      session.save();
      return session;
    });

};

module.exports = Session;
