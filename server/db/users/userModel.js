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
