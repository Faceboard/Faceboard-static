var Message = require('./db/messages/messageModel');

function initSocket (nsp) {
  nsp.on('connection', function (socket) {
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
        });
    });

    socket.on('ipaddr', function (data) {
      console.log('testm worked');
      var ifaces = os.networkInterfaces();
      for (var dev in ifaces) {
        ifaces[dev].forEach(function(details) {
          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
            socket.emit('ipaddr', details.address);
          }
        });
      }
    });

    socket.on('send offer', function (data) {
      nsp.emit('call received', data );
    });

    socket.on('answer received', function (data) {
      nsp.emit('reply sent', data);
    });

    socket.on('answer sent', function (data) {
      nsp.emit('send to caller', data);
    })

  });
}

module.exports = initSocket;
