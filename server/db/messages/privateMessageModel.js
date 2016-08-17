var Sequelize = require('sequelize');
var db = require('../db');

var PrivateMessages = db.define('privatemessages', {
  text: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  useroneid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  useronename: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  usertwoid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  usertwoname: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

PrivateMessages.findAllBetweenUsers = function (useroneid, usertwoid) {
  return db.query('SELECT * FROM privatemessages WHERE (useroneid =' + useroneid + ' AND ' + 'usertwoid = ' + usertwoid + ' OR useroneid = ' + usertwoid + ' AND usertwoid = ' + useroneid + ') ORDER BY id', {type: Sequelize.QueryTypes.SELECT});
}

module.exports = PrivateMessages;
