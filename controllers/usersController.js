const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../config/queries");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.signupUserPost = [
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are validation errors
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      // if err, do something
      if (err) {
        console.log("Error storing password");
        return res.json({ message: "Error storing password" });
      } else {
        // otherwise, store hashedPassword in DB
        const result = await queries.signupUser(
          username,
          hashedPassword,
          email
        );
        console.log(result);
        return res.redirect("/");
      }
    });
  }),
];

exports.loginPost = [
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are validation errors
      res.status(400).json({ errors: errors.array() });
      return;
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log("Auth failed");
        return res
          .status(400)
          .json({ message: info.message || "Authentication failed" });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.log("Auth failed");
          return next(err);
        }
        return res.redirect("/posts");
      });
    })(req, res, next);
  }),
];
