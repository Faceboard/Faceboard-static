var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var db = require('../db');

var Session = db.define('session', {
  userOneid: Sequelize.STRING,
  userTwoid: Sequelize.STRING
});

Session.start = function(username) {
  return Session.create({ userOneid: username })
    .spread(function(session, created) {
      console.log("this is in session model: ", session)
        return created;
    });
};

Session.invite = function(username, sessionid) {

};
