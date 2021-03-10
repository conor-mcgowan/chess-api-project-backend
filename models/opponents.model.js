const pool = require("../config/mysql.conf");

async function add(res, opp) {
  try {
    if (
      !opp.username ||
      opp.username.length > 40 ||
      opp.username.length < 1 ||
      isNaN(opp.user_id)
    ) {
      throw "Invalid data provided.";
    }
    await pool.query(
      "INSERT INTO opponents (user_id, username, url) VALUES (?, ?, ?)",
      [opp.user_id, opp.username]
    );

    return res.send({
      success: true,
      data: "Successfully added opponent.",
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, data: null, error: err });
  }
}

async function remove(res, id) {
  try {
    // try to delete
    const [
      opponents,
    ] = await pool.query("DELETE FROM opponents WHERE opponents.id = ?", [id]);
    // success message if ''
    return res.send({
      success: true,
      data: "Successfully removed opponent.",
      error: null,
    });
  } catch (err) {}
  // error message if ''
  console.log(err);
  return res.send({ success: false, data: null, error: err });
}

async function all(res) {
  try {
    const [opponents] = await pool.query("SELECT * FROM opponents");
    // success message if ''
    res.send({ success: true, data: opponents, error: null });
  } catch (err) {
    // error message if ''
    console.log(err);
    return res.send({ success: false, data: null, error: err });
  }
}

module.exports.add = add;
module.exports.remove = remove;
module.exports.all = all;
