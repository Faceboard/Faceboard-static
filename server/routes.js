var userRoutes = require('./db/users/userRoutes');
var sessionRoutes = require('./db/sessions/sessionRoutes');
var messageRoutes = require('./db/messages/messageRoutes');

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
  app.post('/messages/newMessage', messageRoutes.newMessage);  // add a new message
};
