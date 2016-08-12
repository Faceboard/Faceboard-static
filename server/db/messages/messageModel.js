var Sequelize = require('sequelize');
var db = require('../db');

var Message = db.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.TEXT,
  user: Sequelize.STRING,
  visible: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

Message.findAllMessages = function () {
  return Message.findAll({
    attributes: ['id', 'text'],
    where: { visible: true },
    order: '"createdAt" DESC'})
  .then(function (messages) {
    return messages;
  });
};

Message.newMessage = function (text, user) {
  return Message.create({ user: user, text: text })
    .then(function (created) {
      return created;
    });
};

module.exports = Message;
