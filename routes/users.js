var express = require("express");

const usersController = require("../controllers/usersController");
const asyncHandler = require("express-async-handler");

var router = express.Router();

/* GET users listing. */
router.get("/sign-up", async function (req, res, next) {
  res.render("sign-up-form");
});

router.post("/sign-up", usersController.signupUserPost);

router.get(
  "/login",
  asyncHandler(async function (req, res) {
    res.render("login");
  })
);

router.post("/login", usersController.loginPost);

module.exports = router;
