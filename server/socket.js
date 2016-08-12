var Message = require('./db/messages/messageModel');

function initSocket(nsp) {
  nsp.on('connection', function(socket) {
    nsp.emit('user connected', 'A USER CONNECTED');

    socket.on('privateSessionCreation', function (data) {
      var roomname = data.firstUserName + data.secondUserName;
      socket.join(roomname);
      nsp.emit('userWantsToCreateSession', data);
    });

    socket.on('userWantsToJoinSession', function (data) {
      var roomname = data.firstUserName + data.secondUserName;
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
      Message.newMessage(data.text, data.username)
        .then(function (msgObj) {
          nsp.emit('send message', msgObj);
        })
    })

  });
}

module.exports = initSocket;
