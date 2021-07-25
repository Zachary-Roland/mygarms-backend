const express = require("express");
const { addNeed, deleteNeed, getByUserId } = require("../models/needs.models");
const router = express.Router();

router.post("/add", (req, res) => {
  const { user_id, need } = req.body;
  if (user_id) {
    return addNeed(res, user_id, need);
  }
  return res.send({
    success: false,
    error: "invalid data provided",
    data: null,
  });
});

router.delete("/delete", (req, res) => {
  const { user_id, need_id } = req.body;
  if (user_id) {
    return deleteNeed(res, user_id, need_id);
  }
  return res.send({
    success: false,
    error: "invalid data provided",
    data: null,
  });
});

router.get("/user", (req, res) => {
  const { user_id } = req.body;
  if (user_id) {
    return getByUserId(res, user_id);
  }
  return res.send({
    success: false,
    error: "InVaLiD DaTa PrOvIdEd",
    data: null,
  });
});

module.exports = router;
