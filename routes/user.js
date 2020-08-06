const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("../views/login");
});
router.get("/register", (req, res) => {
  res.render("../views/register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (password != password2) {
    errors.push({ msg: "passwords do not match" });
  }
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "input every field" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password should be more than 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email, email })
      .then((user) => {
        if (user) {
          errors.push({ msg: "This email is already registered" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          // 이 else 위치 틀림
          const user = new User({
            name,
            email,
            password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then((user) => {
                  if (user) {
                    console.log(req.body);
                    req.flash("success_msg", "successfully registered");
                    res.redirect("login");
                  }
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

router.post("/login", (req, res, next) =>
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next)
);
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success_msg", "successfully logged out");
  res.redirect("/users/login");
});
module.exports = router;
