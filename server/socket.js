var Message = require('./db/messages/messageModel');
var PrivateMessage = require('./db/messages/privateMessageModel');
var Friends = require('./db/friends/friends');
var RoomMessage = require('./db/messages/roomMessageModel');
var Rooms = require('./db/rooms/roomModel');

function initSocket (nsp) {
  nsp.on('connection', function (socket) {
    nsp.emit('user connected', 'A USER CONNECTED');

    socket.on('privateSessionCreation', function (data) {
      var roomname = data.firstUserName + '*' + data.secondUserName;
      socket.join(roomname);
      nsp.emit('userWantsToCreateSession', data);
    });

    socket.on('userWantsToJoinSession', function (data) {
      var roomname = data.firstUserName + '*' + data.secondUserName;
      socket.join(roomname);
      nsp.to(roomname).emit('userHasJoinedSession', data.firstUserName);
    });

    socket.on('sendWhiteboardID', function (data) {
      socket.to(data.roomname).emit('userHasSentWBID', data.id);
    });

    socket.on('leaveSession', function (roomname) {
      socket.leave(roomname);
      socket.to(roomname).emit('userHasLeftSession', 'USER HAS LEFT');
    });

    socket.on('make sesssion', function (data) {
      nsp.emit('confirm test session', data);
    });

    socket.on('send message', function (data) {
      Message.create({
        user: data.username,
        text: data.text,
        userid: data.userid
      })
      .then(function (msgObj) {
        nsp.emit('send message', msgObj);
      });
    });

    socket.on('makePrivateChat', function (data) {
      socket.join(data.pchat);
      nsp.emit('confirm private chat', data);
    });

    socket.on('send private message', function (msgObj) {
      var chatRoom = msgObj.chatRoom;

      PrivateMessage.create({
        text: msgObj.text,
        useroneid: msgObj.useroneid,
        usertwoid: msgObj.usertwoid,
        useronename: msgObj.useronename,
        usertwoname: msgObj.usertwoname
      })

      nsp.to(chatRoom).emit('send private message', msgObj);
    });

    socket.on('send room invite', function (data) {
      nsp.emit('confirm join room', data);
    });

    // second user
    socket.on('join pchat', function (data) {
      socket.join(data.pchat);
      nsp.to(data.pchat).emit('pchat confirmed', data);
    });

    socket.on('join room', function (data) {
      var roomname = data.roomname
      socket.join(roomname);
      nsp.to(roomname).emit('joined room', data);
    });

    socket.on('send message in room', function(data) {

      RoomMessage.create({
        text: data.text,
        username: data.username,
        userid: data.userid,
        roomid: data.roomid
      });

      nsp.to(data.roomname).emit('sent message in room', data);
    })

    socket.on('delete friend', function (data) {
      var userid = data.userid;
      var friendname = data.friendname;
      Friends.destroy({where: {userid: userid, friendname: friendname}})
        .then(function () {
          socket.emit('deleted friend', data);
        });
    });

    socket.on('delete room', function (data) {
      var userid = data.userid;
      var roomname = data.roomname;
      Rooms.destroy({where: {userid: userid, roomname: roomname}})
        .then(function() {
          socket.emit('deleted room', data);
        });
    });

    socket.on('userConnected', function(data) {
      nsp.emit('userConnectedConfirmed', data);
    });

    socket.on('userDisconnected', function(data) {
      nsp.emit('userDisconnectedConfirmed', data);
    });
  });
}

module.exports = initSocket;
