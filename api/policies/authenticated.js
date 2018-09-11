module.exports = (req, res, next) => {
  'use strict';

  if (req.isSocket) {
    if (req.session && req.session.passport && req.session.passport.user) {
      return next();
    }
    res.json(401);
  } else {
    if (req.isAuthenticated()) {
      return next();
    }
    // or res.redirect('/path');
    res.json(401);
  }
};
