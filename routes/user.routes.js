const express = require("express");
const passport = require("passport");
const router = express.Router();
const userFunctions = require("../models/users.model");

router.post("/signup", (req, res) => {
  return userFunctions.signUp(res, req.body.username, req.body.password);
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send({
        success: false,
        data: null,
        error: "Something went wrong, please try again later!",
      });
    }
    if (!user) {
      return res.send({ success: false, data: null, error: info });
    }
    req.logIn(user, (err) => {
      return res.send({
        success: true,
        data: { username: user.username },
        error: null,
      });
    });
  })(req, res);
});

module.exports = router;
