const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({id}).exec((err, user) => {
    cb(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'username', passportField: 'password' }, (username, password, cb) => {

  User.findOne({username: username}).exec(function(err, user) {
    if(err) {
      return cb(err);
    }

    if(!user) {
      return cb(null, false, { message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if(!res) {
        return cb(null, false, { message: 'Invalid Password' });
      }
      return cb(null, user, { message: 'Login Succesful' });
    });
  });
}));
