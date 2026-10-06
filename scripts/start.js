const db = require("../config/db");
const path = require("path");
const { spawn } = require("child_process");

function exec(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function initDatabase() {
  await exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  await exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      fullname TEXT NOT NULL
    )
  `);

  const posts = [
    ["NodeJS", "Lập trình backend với Node.js thuần"],
    ["Web động", "Server trả về nội dung tương ứng với request"],
    ["React", "Lập trình giao diện frontend với React"],
    ["Express", "Xây dựng web với Express Framework"],
    ["MVC", "Tổ chức project theo mô hình MVC"],
    ["REST API", "API trả dữ liệu JSON cho frontend"]
  ];

  for (const [title, description] of posts) {
    await new Promise((resolve, reject) => {
      db.get("SELECT id FROM posts WHERE title = ?", [title], async (err, row) => {
        if (err) return reject(err);
        if (row) return resolve();
        db.run(
          "INSERT INTO posts(title, description) VALUES (?, ?)",
          [title, description],
          insertErr => insertErr ? reject(insertErr) : resolve()
        );
      });
    });
  }

  await new Promise((resolve, reject) => {
    db.get("SELECT id FROM users WHERE username = ?", ["admin"], (err, row) => {
      if (err) return reject(err);
      if (row) return resolve();
      db.run(
        "INSERT INTO users(username, password, fullname) VALUES (?, ?, ?)",
        ["admin", "123456", "Administrator"],
        insertErr => insertErr ? reject(insertErr) : resolve()
      );
    });
  });
}

(async () => {
  try {
    console.log("Đang chuẩn bị database SQLite...");
    await initDatabase();
    console.log("Database sẵn sàng.");

    const child = spawn(process.execPath, [path.join(__dirname, "..", "app.js")], {
      stdio: "inherit",
      env: process.env
    });

    child.on("exit", code => process.exit(code ?? 0));
  } catch (error) {
    console.error("Không thể khởi động project:", error);
    process.exit(1);
  }
})();
