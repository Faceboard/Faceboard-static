exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('new message', function(msg) {
      socket.broadcast.to(msg.channelID).emit('new bc message', msg);
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
  });
}

module.exports = function() {
  var privateSession = io.of('/sessionOne');
  privateSession.on('connection', function (socket) {
    socket.join('sessionOne');
    socket.on('chat msg sent', function (data) {
      socket.broadcast.to.(privateSession).emit('from server', data);
    })
  })
}

// client side io.connect('herourl/sessionOne')
// socket.on('chat msg event', data)
// socket.on('from server', function(data) {do whatever})