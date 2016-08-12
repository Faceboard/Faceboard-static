var Sequelize = require('sequelize');
var settings = require('./settings.js');

var url = process.env.DATABASE_URL || settings.DBURL;

var options = process.env.DATABASE_URL ? { 'ssl': true, 'dialectOptions': { 'ssl': { 'require': true }}} : { logging: false };

var sequelize = new Sequelize( url, options );

module.exports = sequelize;
