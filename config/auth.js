module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error_msg", "you cannot access here");
      res.redirect("users/login");
    }
  },
};
