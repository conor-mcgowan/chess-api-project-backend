const express = require("express");
const passport = require("passport");
const router = express.Router();
const userFunctions = require("../models/users.model");

router.post("/signup", (req, res) => {
  return userFunctions.signUp(res, req.body.username, req.body.password);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.send({ success: true, data: "Conor", error: null });
});
// userFunctions.login(res, req.body.username, req.body.password);
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.send({ success: false, data: null, error: err });
//     }
//     if (!user) {
//       return res.send({ success: false, data: null, error: info });
//     }
//     return res.send({
//       success: true,
//       data: { username: user.username },
//       error: null,
//     });
//   })(req, res);
// });

module.exports = router;
