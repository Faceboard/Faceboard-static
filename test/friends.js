var Friends = require('../server/db/friends/friends');
var expect = require('chai').expect;
var db = require('../server/db/db');
var Sequelize = require('sequelize');

describe('Friends table', function () {

  before(function () {
    return Friends.sync();
  });

  beforeEach(function () {
    return db.query('DELETE FROM friends WHERE userid=500');
  });

  it('should add a friend to the database', function() {
    var userid = 500;
    var friendid = 200;
    var friendname = 'Ryo Catch Em'

    Friends.findOrCreate({
      where: {
        userid: userid,
        friendid: friendid
      },
      defaults: {
        friendname: friendname
      }
    })
    .then(function (user) {

      db.query('SELECT * FROM friends WHERE userid=500', {type: Sequelize.QueryTypes.SELECT})
      .then(function (result) {
        expect(result[0].userid).to.equal(userid);
        expect(result[0].friendid).to.equal(friendid);
        expect(result[0].friendname).to.equal(friendname);
      });
    });
  });

  it('should return an fail to create duplicate friends', function() {
    var userid = 500;
    var friendid = 201;
    var friendname = 'Jason Got Em';

    function makeFriends (id, fId, fName) {
      return Friends.findOrCreate({
        where: {
          userid: id,
          friendid: fId
        },
        defaults: {
          friendname: fName
        }
      })
    }

    makeFriends(userid, friendid, friendname);
    makeFriends(userid, friendid, friendname);

    db.query('SELECT * FROM friends WHERE userid=500', {
      type: Sequelize.QueryTypes.SELECT
    })
    .then(function (result) {
      expect(result.length).to.equal(1);
    });
  });

})












