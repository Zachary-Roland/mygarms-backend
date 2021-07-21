const bcrypt = require("bcrypt");
const query = require("../config/mysql.conf");

async function login(res, username, password) {
  // This makes sense as a response. Success will always be true or false.
  // I'm including data and error even though only one will have info at a time, include all 3 keys every time.
  let json = { success: false, data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0] || { password: 1234 };
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      json = { ...json, success: matches, data: { username, id: user.id } };
    } else {
      json = { ...json, error: "Invalid username / password" };
    }
  } catch (err) {
    json = { ...json, error: "SoMeThInG wEnT wRoNg" };
  } finally {
    return res.send(json);
  }
}

async function signup(res, username, password) {
  let json = { success: false, data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length !== 0) {
      json = { ...json, error: "Username already taken" };
    } else {
      const hashed = await bcrypt.hash(password, 10);
      await query("INSERT INTO users (password, username) VALUES (?,?)", [
        hashed,
        username,
      ]);
      json = { ...json, success: true };
    }
  } catch (err) {
    console.log(err);
    json = { ...json, error: "SOMETHING WENT WRONG" };
  } finally {
    return res.send(json);
  }
}

module.exports = { login, signup };
