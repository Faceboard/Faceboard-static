var Friends = require('./friends');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || 'KeYbOaRdCaT';

module.exports = {
  addFriend: function (req, res) {
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;
    var friendid = req.body.friendid;
    var friendname = req.body.friendname;

    Friends.findOrCreate({where: {
      userid: userid,
      friendid: friendid,
    }, defaults: {friendname: friendname}})
    .spread(function (friend, created) {
      res.sendStatus(created ? 200 : 204);
    })

  },

  findAllFriends: function (req, res) {
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;
    Friends.findAllFriends(userid)
      .then(function (friends) {
        res.json(friends);
      });
  },

  deleteFriend: function (req, res) {
    var userid = jwt.decode(req.headers['x-access-token'], secret).id;
    var friendid = req.body.friendid;
    Friends.destroy({where: {userid: userid, friendid:friendid}})
    .then(function (data) {
      res.sendStatus(204);
    })
  }

};
