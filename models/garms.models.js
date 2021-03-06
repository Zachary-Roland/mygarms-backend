const { getFips } = require("crypto");
const query = require("../conf/mysql.conf");

async function addGarm(res, user_id, garm) {
  let json = { success: false, data: null, error: null };
  try {
    const result = await query(
      "INSERT INTO Garments (user_id, garm_title, garm_type, garm_brand, garm_cost, garm_condition, garm_season, garm_url, garm_own) VALUES (?,?,?,?,?,?,?)",
      [
        user_id,
        garm.title,
        garm.type,
        garm.brand,
        garm.cost,
        garm.condition,
        garm.season,
        garm.img,
        garm.own,
      ]
    );
    garm = { ...garm, id: result.insertId, user_id };
    json = { ...json, success: true, data: garm };
  } catch (err) {
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

async function deleteGarm(res, user_id, garm_id) {
  let json = { success: false, data: null, error: null };
  try {
    await query("DELETE FROM Garments WHERE user_id = ? AND garm_id = ?", [
      user_id,
      garm_id,
    ]);
    json = { ...json, success: true };
  } catch (err) {
    json = { ...json, error: "Something Went Wrong" };
  } finally {
    return res.send(json);
  }
}

async function getByUserId(res, user_id) {
  let json = { success: false, data: null, error: null };
  try {
    const garms = await query("SELECT * FROM Garments WHERE user_id = ?", [
      user_id,
    ]);
    json = { ...json, success: true, data: garms };
  } catch (err) {
    json = { ...json, error: "Something Went Wrong?" };
  } finally {
    res.send(json);
  }
}

module.exports = { addGarm, deleteGarm, getByUserId };
