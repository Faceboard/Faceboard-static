var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var db = require('../db');

var Session = db.define('session', {
  userOneid: Sequelize.STRING,
  userTwoid: Sequelize.STRING
});

Session.startSession = function(username) {
  return Session.create({ userOneid: username })
    .then(function(created) {
        return created;
    });
};

Session.invite = function(username, sessionid) {

};

module.exports = Session;
