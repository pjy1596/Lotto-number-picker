// 여기서 뭘 const 해줘야 되는지 헷갈림
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          } else {
            bcrypt
              .compare(password, user.password)
              .then((isMatch) => {
                if (!isMatch) {
                  return done(null, false, { message: "Incorrect password." });
                } else {
                  return done(null, user);
                  //   이 위에 걸 까먹으면 안됨. 얘는 다 잘 됐을 때 마무리로 써주는 것
                }
              })
              .catch((err) => console.log(err));
          }
          // if (!user.validPassword(password)) {
          //   return done(null, false,  {message: 'Incorrect password'});
          // } password는 이걸로 안하고 hash 된 거 비교해서 푸는 식으로 함, compare
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
