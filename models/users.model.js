const bcrypt = require("bcrypt");
const pool = require("../config/mysql.conf");

function isInvalid(val, min, max) {
  return !val || val.length < min || val.length > max;
}

async function signUp(res, username, password) {
  try {
    if (isInvalid(username, 5, 20) || isInvalid(password, 7, 20)) {
      throw "Invalid Data Provided";
    }
    let [
      user,
    ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user.length > 0) {
      throw "Username is already taken";
    }
    const encrypted = await bcrypt.hash(password, 8);
    await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [
      username,
      encrypted,
    ]);
    return res.send({
      success: true,
      data: "Successfully signed up!",
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}

async function login(res, username, password) {
  try {
    if (isInvalid(username, 5, 20) || isInvalid(password, 8, 20)) {
      throw "Invalid Data Provided";
    }
    let [
      users,
    ] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (users.length === 0) {
      throw "Invalid USERNAME or password.";
    }
    const match = await bcrypt.compare(password, users[0].password);
    if (!match) {
      throw "Invalid username or PASSWORD.";
    }
    res.send({
      success: true,
      data: { username: users[0].username },
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}

module.exports.signUp = signUp;
module.exports.login = login;
