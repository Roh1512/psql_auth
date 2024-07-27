var express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});
router.get("/profile", verifyAuth, (req, res) => {
  res.send("<h1>Profile</h1>");
});
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
