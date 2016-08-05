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

module.exports = User;