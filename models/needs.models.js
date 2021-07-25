const query = require("../config/mysql.conf");

async function addNeed(res, user_id, text) {
  let json = { success: false, data: null, error: null };
  try {
    console.log(user_id, text);
    const result = await query(
      "INSERT INTO needs (user_id, text) VALUES (?,?)",
      [user_id, text]
    );
    need = { ...need, id: result.insertId, user_id };
    json = { ...json, success: true, data: need };
  } catch (err) {
    console.log(err);
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

async function deleteNeed(res, user_id, need_id) {
  let json = { success: false, data: null, error: null };
  try {
    await query("DELETE FROM needs WHERE user_id = ? AND need_id = ?", [
      user_id,
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

async function getByUserId(res, user_id) {
  let json = { success: false, data: null, error: null };
  try {
    const needs = await query("SELECT * FROM needs WHERE user_id = ?", [
      user_id,
    ]);
    json = { ...json, success: true, data: needs };
  } catch (err) {
    console.log(err);
    json = { ...json, error: "sOmEtHiNg WeNt WrOnG" };
  } finally {
    return res.send(json);
  }
}

module.exports = { addNeed, deleteNeed, getByUserId };
