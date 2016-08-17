var Message = require('./db/messages/messageModel');
var PrivateMessage = require('./db/messages/privateMessageModel');

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
      nsp.to(roomname).emit('userHasJoinedSession', 'USER JOINED');
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
        text: data.text
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
        usertwoid: msgObj.usertwoid
      })
      .then(function(data) {
        socket.to(chatRoom).emit('send private message', msgObj);
      })
    });

    // second user
    socket.on('join pchat', function (data) {
      socket.join(data.pchat);
      nsp.to(chatRoom).emit('pchat confirmed', data);
    });

  });
}

module.exports = initSocket;
