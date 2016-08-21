var User = require('../server/db/users/userModel');
var expect = require('chai').expect;
var db = require('../server/db/db');

describe('User table', function () {

  before(function () {
    return User.sync();
  })

  beforeEach(function () {
    return db.query('DELETE FROM users WHERE sessionid=500')
  });

  it('should add a user to the database', function () {
    User.create({
      username: 'JASON MASTER',
      password: 'HE LOVES POKEMON',
      sessionid: 500
    })
    .then(function (result) {
      expect(result.username).to.equal('JASON MASTER');
    })
  });

  it('should fetch an existing user', function(done) {
    db.query("INSERT INTO users (username, password, sessionid) VALUES ('ron', 'CHICKS', 500)")
    .then(function () {
      return User.findOne({
        where: {
          username: 'ron'
        }
      });
    })
    .then(function (result) {
      expect(result.sessionid).to.equal(500);
      done();
    });
  });

  it('should hash user passwords', function (done) {
    User.create({
      username: 'RYO MASTER',
      password: 'I LOST MY BUTTERFREE',
      sessionid: 500
    })
    .then(function() {
      return User.findOne({
        where: {
          username: 'RYO MASTER'
        }
      });
    })
    .then(function(result) {
      expect(result.password).to.not.equal('I LOST MY BUTTERFREE');
      done();
    });
  });

  it('should fail when searching for a nonexistent user', function () {
    User.findOne({
      where: {
        username: 'What am I'
      }
    })
    .then(function (result) {
      expect(result).to.be.null;
    });
  });

});
