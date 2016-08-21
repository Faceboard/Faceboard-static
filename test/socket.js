var expect = require('chai').expect;
var io = require('socket.io-client');
var db = require('../server/db/db');
var Sequelize = require('sequelize');

var socketURL = 'http://localhost:3000/test';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Messages', function() {

  it('should recieve message back when sending message', function (done) {
    var clientOne = io.connect(socketURL, options);
    var msgObj = {
      username: 'ryo',
      text: 'I WANNA BE THE VERY BEST'
    };

    clientOne.emit('send message', msgObj);

    clientOne.on('send message', function (data) {
      expect(data.text).to.equal(msgObj.text);
      clientOne.disconnect();
      db.query('DELETE FROM messages');
      done();
    });
  });
});

describe('Private Messages', function() {
  var clientOne, clientTwo;

  it('should be able to join private chat', function (done) {
    clientOne = io.connect(socketURL, options);
    clientTwo = io.connect(socketURL, options);
    var dataOne = {
      pchat: 'chatroom'
    }
    var dataTwo = {
      pchat: 'chatroom',
      text: 'THAT NO ONE EVER WAS'
    }

    clientOne.on('connect', function () {
      clientOne.emit('join pchat', dataOne)
    })

    clientTwo.on('connect', function () {
      clientTwo.emit('join pchat', dataTwo);
    });

    clientTwo.on('pchat confirmed', function (data) {
      expect(data.text).to.equal(dataTwo.text);
      done();
    });
  });

  it('should be able to send private messages', function (done) {
    var msgObj = {
      text: 'TO CATCH THEM IS MY REAL TEST',
      chatRoom: 'chatroom',
      useroneid: 15,
      usertwoid: 16,
      useronename: 'Jason',
      usertwoname: 'Fason'
    };

    clientOne.emit('send private message', msgObj);

    clientTwo.on('send private message', function (data) {
      expect(data.useronename).to.equal('Jason');
      clientOne.disconnect();
      clientTwo.disconnect();
      done();
    });
  });

  it('should have saved private messages to the database', function (done) {

    db.query('SELECT * FROM privatemessages WHERE useroneid=15 AND usertwoid=16',
      {type: Sequelize.QueryTypes.SELECT})
    .then(function (data) {
      data.forEach(function (obj) {
        expect(obj.text).to.equal('TO CATCH THEM IS MY REAL TEST');
        expect(obj.useroneid).to.equal(15);
        expect(obj.usertwoid).to.equal(16);
      });

      db.query('DELETE FROM privatemessages WHERE useroneid=15');
      done();
    });

  });

});