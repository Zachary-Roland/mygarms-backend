const express = require("express");
const router = express.Router();
const { addGarm, deleteGarm, getByUserId } = require("../models/garms.models");

router.post("/add", (req, res) => {
  const { user_id, garm } = req.body;
  if (user_id) {
    return addGarm(res, user_id, garm);
  }
  return res.send({
    success: false,
    error: "Invalid data provided",
    data: null,
  });
});

router.delete("/delete", (req, res) => {
  const { user_id, garm_id } = req.body;
  if (user_id) {
    return deleteGarm(res, user_id, garm_id);
  }
  return res.send({
    success: false,
    error: "invalid data provided",
    data: null,
  });
});

router.get("/user/:user_id", (req, res) => {
  return getByUserId(res, req.params.user_id);
});

module.exports = router;
