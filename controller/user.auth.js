
//########################################### Initialise Express ###########################################//
let express = require('express');
let app = express();
User = require('../model/user');
var config = require('../config/db.config');
app.set('superSecret', config.secret);
var jwt    = require('jsonwebtoken');


//########################################### add new User ###########################################//
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.admin = req.body.admin;
// save the contact and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New user created!',
            data: user
        });
    });
};

//###########################################    User Login With JWT Auth ###########################################//
exports.login = function (req, res) { 
  //console.log(app.get('superSecret'));
    User.findOne({
      name: req.body.name
    }, function(err, user) {
  
      if (err) throw err;
  
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
  
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
        var token = jwt.sign({ admin: user.admin}, app.get('superSecret'), { expiresIn: 60 * 60, algorithm: 'HS256'});
          
          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
        } 
      }
  
    });
}