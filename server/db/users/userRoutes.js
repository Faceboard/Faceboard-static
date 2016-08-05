var User = require('./userModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || "KeYbOaRdCaT";

module.exports = {

  signUp: function(req, res){

    var name = req.body.username;
    var password = req.body.password;

    User.signUp(name, password)
      .then(function(created){
        res.sendStatus(created ? 201 : 401);
      });
  }
};