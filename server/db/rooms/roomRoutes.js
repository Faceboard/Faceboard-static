var Room = require('./roomModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || 'KeYbOaRdCaT';

module.exports = {
  findAllRooms: function (req, res) {
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;

    Room.findAllForUser(userid)
      .then(function (rooms) {
        res.json(rooms);
      });
  },

  makeRoom: function (req, res) {
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;
    var roomname = req.body.roomname;
    var roomid = req.body.roomid;

    Room.findOrCreate({
      where: {
        userid: userid,
        roomname: roomname,
        roomid: roomid
      }
    })
    .spread(function (room, created) {
      res.sendStatus(created ? 200 : 401);
    });
  }
};