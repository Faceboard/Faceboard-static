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
  usertwoid: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
});

PrivateMessages.findAllBetweenUsers = function (useroneid, usertwoid) {
  return PrivateMessages.findAll({
    where: {$or: [
        {useroneid: useroneid},
        {useroneid: usertwoid}],
      $or: [
        {usertwoid: usertwoid},
        {usertwoid: useroneid}]
      },
    order: '"createdAt" DESC'
  });
};

// PrivateMessages.findAllBetweenUsers = function (useroneid, usertwoid) {
//   return PrivateMessages.findAll({
//     where: {useroneid, usertwoid},
//     order: '"createdAt" DESC'
//   });
// };

module.exports = PrivateMessages;