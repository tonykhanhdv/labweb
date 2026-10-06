const { execFileSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function commandExists(cmd) {
  try {
    execFileSync("bash", ["-lc", `command -v ${cmd}`], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function run(cmd) {
  execFileSync("bash", ["-lc", cmd], { stdio: "inherit" });
}

function waitMysql() {
  for (let i = 0; i < 40; i++) {
    try {
      execFileSync("bash", ["-lc", "mysqladmin ping -uroot -p123456 --silent"], { stdio: "ignore" });
      return true;
    } catch {}
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
  }
  return false;
}

if (!commandExists("mysqld")) {
  console.log("MySQL chưa có trong môi trường.");
  console.log("Nếu dùng GitHub Codespaces, hãy Rebuild Container để .devcontainer cài MySQL.");
  process.exit(1);
}

try {
  run("sudo service mysql start || sudo service mariadb start || true");
} catch {}

if (!waitMysql()) {
  console.log("Không khởi động được MySQL.");
  process.exit(1);
}

try {
  run("mysql -uroot -p123456 < database/init.sql");
} catch {
  console.log("Không import được database/init.sql");
  process.exit(1);
}

const child = spawn(process.execPath, [path.join(__dirname, "..", "app.js")], {
  stdio: "inherit",
  env: {
    ...process.env,
    DB_HOST: process.env.DB_HOST || "127.0.0.1",
    DB_PORT: process.env.DB_PORT || "3306",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "123456",
    DB_NAME: process.env.DB_NAME || "newsdb"
  }
});

child.on("exit", code => process.exit(code ?? 0));
