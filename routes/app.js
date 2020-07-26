const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../config/auth").ensureAuthenticated;

router.get("/", (req, res) => {
  res.render("../views/welcome");
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("../views/dashboard", {
    name: req.user.name,
    // 이거 또 못 넣어서 한참 걸림
  });
});
module.exports = router;
