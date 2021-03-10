const express = require("express");
const router = express.Router();
const opponentFunctions = require("../models/opponents.model");

router.post("/add", (req, res) => {
  return opponentFunctions.add(res, req.body);
});

router.delete("/delete", (req, res) => {
  return opponentFunctions.remove(res, req.params.id, req.user.id);
});

router.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in, ya dope.");
  }
  return opponentFunctions.byUserID(res, req.params.id);
});

router.get("/all", (req, res) => {
  return opponentFunctions.all(res);
});

module.exports = router;
