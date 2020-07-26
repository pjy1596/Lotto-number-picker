// register logic 작성 부분 처참하게 틀림, else 뺌
// redirect는 flash할 때 쓰는 거임 / ejs에서 if문 할 때는 typeof var != 쓰고
// flash에서 if문 할 때는 var != ''으로 씀
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
app.use(expressLayouts);
const db = require("./config/keys").MongoURI;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected...");
  })
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "aaa",
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  res.locals.error_msg = req.flash("error_msg");
  // error 까먹을 뻔
  next();
});

app.use("/", require("./routes/app"));
app.use("/users", require("./routes/user"));
app.use("/users/result", express.static("public"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server connected on ${PORT}`));
