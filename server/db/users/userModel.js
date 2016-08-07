var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var db = require('../db');

var User = db.define('user', {
  userid: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  password: Sequelize.STRING,
  sessionid: Sequelize.INTEGER
}, {
  timestamps: false
})

User.hook('beforeCreate', function (user) {
  return bcrypt.hashAsync (user.password, null, null)
    .then(function (hash) {
      user.password = hash;
    });
});

User.comparePassword = function (possPassword, currPassword) {
  return bcrypt.compareAsync(possPassword, currPassword);
};

User.signUp = function (name, password) {
  return User.findOrCreate({ where: { userid: name }, defaults: { password: password }})
    .spread(function(user, created) {
      return created;
    });
};

User.signIn = function (username, password) {
  return User.findOne({ where: {userid: username } })
    .then(function (user) {
      if (!user) {
        return null;
      } else {
        return User.comparePassword(password, user.password)
          .then(function (match) {
            return match ? user : null;
          });
      }
    });
};

User.updateSession = function (id, newSessionId) {
  return User.findById(id)
    .then(function (user) {
      user.sessionid = newSessionId;
      user.save();
      return user;
    });
};

User.findSessionId = function (userId) {
  return User.findById(userId)
    .then(function(user) {
      return user.sessionid;
    });
};

User.findUserById = function (userId) {
  return User.findById(userId)
    .then(function (user) {
      return user;
    });
};

module.exports = User;
