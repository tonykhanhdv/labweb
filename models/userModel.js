const db = require("../config/db");

async function findUserByUsernameAndPassword(username, password) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  return rows[0];
}

module.exports = {
  findUserByUsernameAndPassword
};
