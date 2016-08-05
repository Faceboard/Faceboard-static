var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt'));
var db = require('../db');

var User = db.define('user', {
  userId: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING
}, {
  timestamps: false
})

User.hook('beforeCreate', function(user) {
  return bcrypt.hashAsync(user.password, null, null)
    .then(function(hash) {
      user.password = hash;
    });
});

User.comparePassword = function(inputPassword, currentPassword){
  return bcrypt.compareAsync(inputPassword, currentPassword);
}

User.signUp = function(name, password){
  User.findOrCreate({ where: { userId: name }, defaults: { password: password }})
    .spread(function(user, created){
      console.log('This is user in usermodel: ', user);
      return created;
    });
}