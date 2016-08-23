var Sequelize = require('sequelize');
var db = require('../db');

var Room = db.define('rooms', {
  userid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  roomname: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  roomid: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

Room.findAllForUser = function (id) {
  return db.query('SELECT r.roomname, r.roomid FROM rooms r JOIN users u ON r.userid=u.id where u.id=' + id, {
    type: Sequelize.QueryTypes.SELECT
  });
};

module.exports = Room;
