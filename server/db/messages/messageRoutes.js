var Message = require('./messageModel');

module.exports = {

  // query DB for ALL messages
  findAllMessages: function (req, res) {
    Message.findAll()
      .then(function (messages) {
        res.json(messages);
      });
  },

  // post a new message to db
  newMessage: function (req, res) {
    var text = req.body.text;
    var user = req.body.user;

    Message.newMessage(text, user)
      .then(function (created) {
        res.sendStatus(created ? 201 : 401);
      });
  }

};
