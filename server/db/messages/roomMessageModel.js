var Sequelize = require('sequelize');
var db = require('../db');

var RoomMessage = db.define('roommessages', {
  text: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  userid: {
    type: Sequelize.STRING,
    valide: {
      notEmpty: true
    }
  },
  roomid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = RoomMessage;

RoomMessage.findAllInRoom = function(roomid) {
  return db.query('SELECT * FROM roommessages r WHERE roomid=' + roomid + ' ORDER BY id', {
    type: Sequelize.QueryTypes.SELECT
  })
}
