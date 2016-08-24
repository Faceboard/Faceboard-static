var Message = require('./messageModel');
var PrivateMessages = require('./privateMessageModel');
var RoomMessage = require('./roomMessageModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || 'KeYbOaRdCaT';

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
    var userid = req.body.userid;

    Message.newMessage(text, user, userid)
      .then(function (created) {
        res.sendStatus(created ? 201 : 401);
      });
  },

  privateMessagesBetweenUsers: function (req, res) {
    var useroneid = jwt.decode(req.headers['x-access-token'], secret).id;
    var usertwoid = req.body.usertwoid;

    PrivateMessages.findAllBetweenUsers(useroneid, usertwoid)
      .then(function (messages) {
        res.json(messages);
      });
  },

  // might not even be used
  addPrivateMessagesBetweenUsers: function (req, res) {
    var useroneid = jwt.decode(req.headers['x-access-token'], secret).id;
    var useronename = jwt.decode(req.headers['x-access-token'], secret).username;
    var usertwoid = req.body.usertwoid;
    var usertwoname = req.body.usertwoname;
    var text = req.body.text;

    PrivateMessages.create({text, useroneid, usertwoid, useronename, usertwoname})
      .then(function (messages) {
        res.sendStatus(200);
      });
  },
  // COME BACK HERE
  createRoomMessage: function (req, res) {
    var text = req.body.text;
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;
    var username = jwt.decode(req.headers['x-access-token'], secret).username;
    var roomname = req.body.roomname;

    RoomMessage.create({text, userid, username, roomname})
      .then(function (message) {
        res.sendStatus(200);
      });
  },

  findMessagesInRoom: function (req, res) {
    var roomname = req.body.roomname;
    RoomMessage.findAllInRoom(roomname)
      .then(function (messages) {
        res.json(messages);
      });
  }

};
