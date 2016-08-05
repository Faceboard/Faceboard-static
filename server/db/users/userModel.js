var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var db = require('../db');

var User = db.define('user', {
  userid: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING
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

module.exports = User;