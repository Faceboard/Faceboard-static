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
      friendname: friendname}
    })
    .spread(function(friends, created) {
      res.sendStatus(created ? 200 : 401);
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
    Friend.destroy({where: {userid, friendid}});
  }

};
