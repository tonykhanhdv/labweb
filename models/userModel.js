const db = require("../config/db");

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function findUserByUsernameAndPassword(username, password) {
  return get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
}

module.exports = {
  findUserByUsernameAndPassword
};
