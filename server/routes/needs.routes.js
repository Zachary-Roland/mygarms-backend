const express = require("express");
const { addNeed, deleteNeed, getByGarmId } = require("../models/needs.models");
const router = express.Router();

router.post("/add", (req, res) => {
  const { garm_id, need } = req.body;
  if (garm_id) {
    return addNeed(res, garm_id, need);
  }
  return res.send({
    success: false,
    error: "invalid data provided",
    data: null,
  });
});

router.delete("/delete", (req, res) => {
  const { garm_id, need_id } = req.body;
  if (garm_id) {
    return deleteNeed(res, garm_id, need_id);
  }
  return res.send({
    success: false,
    error: "invalid data provided",
    data: null,
  });
});

router.get("/garm", (req, res) => {
  const { garm_id } = req.body;
  if (garm_id) {
    return getByGarmId(res, garm_id);
  }
  return res.send({
    success: false,
    error: "InVaLiD DaTa PrOvIdEd",
    data: null,
  });
});

module.exports = router;
