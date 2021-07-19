const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  const { user_id, garm } = req.body;
  if (user_id && garm && garmName && garmCondition && garmSeason && garmOwn) {
    return addGarm(res, user_id, garm);
  }
  return res.send({
    success: false,
    error: "Invalid data provided",
    data: null,
  });
});

router.delete("/delete/:user_id/:garm_id", (req, res) => {
  const { user_id, garm_id } = req.params;
  return deleteGarm(res, user_id, garm_id);
});

router.get("/user/:user_id", (req, res) => {
  return getByUserId(res, req.params.user_id);
});

module.exports = router;
