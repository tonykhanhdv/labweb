const { execFileSync, spawn } = require("child_process");
const path = require("path");

function run(command, options = {}) {
  execFileSync("bash", ["-lc", command], {
    stdio: options.quiet ? "ignore" : "inherit"
  });
}

function exists(command) {
  try {
    run(`command -v ${command}`, { quiet: true });
    return true;
  } catch {
    return false;
  }
}

function waitDatabase() {
  for (let i = 0; i < 30; i++) {
    try {
      run("sudo mariadb-admin ping --silent", { quiet: true });
      return true;
    } catch {
      try {
        run("sudo mysqladmin ping --silent", { quiet: true });
        return true;
      } catch {}
    }
    run("sleep 1", { quiet: true });
  }
  return false;
}

try {
  if (!exists("mariadb") && !exists("mysql")) {
    console.log("Lần chạy đầu: đang cài MariaDB cho Codespaces...");
    run("sudo apt-get update");
    run("sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server mariadb-client");
  }

  console.log("Đang khởi động database...");
  run("sudo service mariadb start || sudo service mysql start || true", { quiet: true });

  if (!waitDatabase()) {
    throw new Error("Database không khởi động được");
  }

  console.log("Đang tạo database và dữ liệu Lab 11...");
  if (exists("mariadb")) {
    run("sudo mariadb < database/init.sql", { quiet: true });
  } else {
    run("sudo mysql < database/init.sql", { quiet: true });
  }

  console.log("Database sẵn sàng.");
  console.log("Khởi động Express...");

  const child = spawn(process.execPath, [path.join(__dirname, "..", "app.js")], {
    stdio: "inherit",
    env: {
      ...process.env,
      DB_HOST: process.env.DB_HOST || "127.0.0.1",
      DB_PORT: process.env.DB_PORT || "3306",
      DB_USER: process.env.DB_USER || "newsuser",
      DB_PASSWORD: process.env.DB_PASSWORD || "news123",
      DB_NAME: process.env.DB_NAME || "newsdb"
    }
  });

  child.on("exit", code => process.exit(code ?? 0));
} catch (error) {
  console.error("\nKhông thể khởi động project:", error.message);
  process.exit(1);
}
