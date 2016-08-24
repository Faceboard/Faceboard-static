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
  roomname: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = RoomMessage;

RoomMessage.findAllInRoom = function(roomname) {
  return RoomMessage.findAll({
    where: {
      roomname: roomname
    },
    order: '"createdAt" ASC'
  });
}
