var userRoutes = require('./db/users/userRoutes');
var sessionRoutes = require('./db/sessions/sessionRoutes');
var messageRoutes = require('./db/messages/messageRoutes');
var friendRoutes = require('./db/friends/friendRoutes');
var roomRoutes = require('./db/rooms/roomRoutes');

module.exports = function (app, express) {
  app.post('/users/signup', userRoutes.signUp); // sign up, need unique username
  app.post('/users/signin', userRoutes.signIn); // sign in to get auth token
  app.get('/users/findCurrentUser', userRoutes.findOneUser); // find user by auth token (id)
  app.get('/users/findOne', userRoutes.findByUserId); // find user by sending id for that user
  app.get('/users/findall', userRoutes.findAll);  // find all users
  app.post('/users/update/:sessionid', userRoutes.updateSession); // finds a user to update session
  app.post('/session/start', sessionRoutes.startSession); // start session
  app.post('/session/addUser', sessionRoutes.inviteToSession); // invite another user to session
  app.get('/messages/findallMessages', messageRoutes.findAllMessages);  // find all messages
  app.post('/messages/newMessage', messageRoutes.newMessage); // add a new message
  app.get('/friends/findAll', friendRoutes.findAllFriends); // find friends based on userid from token
  app.post('/friends/add', friendRoutes.addFriend); // add friends, needs friendid and friendname
  app.post('/messages/private/findAll', messageRoutes.privateMessagesBetweenUsers);
  app.post('/messages/private/add', messageRoutes.addPrivateMessagesBetweenUsers);
  app.post('/messages/rooms/add', messageRoutes.createRoomMessage);
  app.post('/messages/rooms/findAll', messageRoutes.findMessagesInRoom);
  app.get('/rooms/findAll', roomRoutes.findAllRooms);
  app.post('/rooms/make', roomRoutes.makeRoom);
};
