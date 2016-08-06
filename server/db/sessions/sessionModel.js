var Sequelize = require('sequelize');
var db = require('../db');

var Session = db.define('session', {
  userOneid: Sequelize.INTEGER,
  userTwoid: Sequelize.INTEGER
});

Session.startSession = function(userId) {
  return Session.create({userOneid: userId})
    .then(function(created) {
      return created;
    });
};

Session.invite = function(username, sessionid) {

};

module.exports = Session;
