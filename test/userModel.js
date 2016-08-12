var User = require('../server/db/users/userModel');
var expect = require('chai').expect;
var settings = require('../server/db/settings');
var pgp = require('pg-promise');

describe('User table', function () {
  var db;

  before(function () {
    return User.sync()
      .then(function () {
        // left blank on purpose
      });
  });

  beforeEach(function () {
    var url = settings.DBURL;
    db = pgp(url);

    // get rid of all fake data before each test
    // And runs a user sync before anything to make sure
    // database is in sync

    return db.query('delete from $1 where $2 like $3', [
      'users',
      'userid',
      'test%'
    ])
    .then(function () {
      // nothing to see hear move along
    });
  });

  it('should add a user to the database', function () {
    // here I use the user model methods to create something
    // then use SQL query to validate
    return User.create({
      userid: 'test Joe',
      password: 'foo123',
      sessionid: 1
    })
    .then(function () {
      return db.query('select * from $1 where $2~=$3', [
        'users',
        'userid',
        'test Joe'
      ]);
    })
    .then(function (result) {
      expect(result.length).to.not.equal(0);
    });
  });

  it('should fetch an existing user', function () {
    // other way around this time! whaaattttt!?
    return db.query('insert into $1~ ($2~, $3~, $4~) values ($5, $6, $7)', [
      'users',
      'userid',
      'password',
      'sessionid',
      'test Ron',
      'I love chicken',
      45
    ])
    .then(function () {
      return User.findOne({
        where: {
          userid: 'test Ron'
        }
      });
    })
    .then(function (result) {
      expect(result).to.not.be.null;
    });
  });

  it('should hash user passwords', function () {
    return User.create({
      userid: 'test Ryo',
      passwords: 'ryoIsTheBest194723'
    })
    .then(function () {
      return User.findOne({
        where: {
          userid: 'test Ryo'
        }
      });
    })
    .then(function (result) {
      expect(result.password).to.not.equal('ryoIsTheBest194723');
    });
  });

  it('should fail when searching for a nonexistent user', function () {
    return User.findOne({
      where: {
        userid: 'What does Patrick not exist'
      }
    })
    .then(function (result) {
      expect(result).to.be.null;
    });
  });
});
