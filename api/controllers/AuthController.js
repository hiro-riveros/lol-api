/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
module.exports = {
  login: (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        return res.send({
          message: info.message,
          user
        })
      }

      req.login(user, (err) => {
        if (err) {
          res.send(err);
        }
        sails.log('User '+user.id+' has logged in.');
        return res.json(user);
      });

    })(req, res);
  },

  logout: (req, res) => {
      req.logout();
      res.json(200);
  },

  signUp: function(req, res){
    //TODO: form validation here

    var data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description
    };

    User.create(data).fetch().exec((err, user) => {
      if (err) {
        console.log(err);
        return res.negoiate(err);
      }
      //TODO: Maybe send confirmation email to the user before login
      req.login(user, (err) => {
        if (err) {
          return res.negotiate(err);
        }
        sails.log('User '+ user.id +' has logged in.');
        return res.json(user);
      });
    });
  }

};
