var Sequelize = require('sequelize');
var db = require('../db');

var Friends = db.define('friends', {
  userid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  friendid: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  friendname: {
    type: Sequelize.STRING
  }
});

Friends.findAllFriends = function (id) {
  return db.query(`SELECT friendid, friendname FROM users u JOIN friends f ON u.id=f.userid WHERE u.id=` + id, {type: Sequelize.QueryTypes.SELECT});
};

module.exports = Friends;
