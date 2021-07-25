const query = require("../config/mysql.conf");

async function addNeed(res, garm_id, need) {
  let json = { success: false, data: null, error: null };
  try {
    console.log(garm_id, need.text);
    const result = await query(
      "INSERT INTO needs (garm_id, text) VALUES (?,?)",
      [garm_id, need.text]
    );
    need = { ...need, id: result.insertId, garm_id };
    json = { ...json, success: true, data: need };
  } catch (err) {
    console.log(err);
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

async function deleteNeed(res, garm_id, need_id) {
  let json = { success: false, data: null, error: null };
  try {
    await query("DELETE FROM needs WHERE garm_id = ? AND need_id = ?", [
      garm_id,
      need_id,
    ]);
    json = { ...json, success: true };
  } catch (err) {
    console.log(err);
    json = { ...json, error: "SOMETHING WENT WRONG" };
  } finally {
    return res.send(json);
  }
}

async function getByGarmId(res, garm_id) {
  let json = { success: false, data: null, error: null };
  try {
    const needs = await query("SELECT * FROM needs WHERE garm_id = ?", [
      garm_id,
    ]);
    json = { ...json, success: true, data: needs };
  } catch (err) {
    console.log(err);
    json = { ...json, error: "sOmEtHiNg WeNt WrOnG" };
  } finally {
    return res.send(json);
  }
}

module.exports = { addNeed, deleteNeed, getByGarmId };
