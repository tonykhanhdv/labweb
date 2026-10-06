const express = require("express");
const path = require("path");
const session = require("express-session");

const postRoutes = require("./routes/postRoute");
const authRoutes = require("./routes/authRoute");
const postApiRoutes = require("./routes/api/postApiRoute");
const authApiRoutes = require("./routes/api/authApiRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "lab11-secret-key",
  resave: false,
  saveUninitialized: false
}));

app.use("/", authRoutes);
app.use("/news", postRoutes);

app.use("/api/posts", postApiRoutes);
app.use("/api/auth", authApiRoutes);

app.use((req, res) => {
  res.status(404).send("404 - Không tìm thấy trang");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy: http://localhost:${PORT}`);
  console.log("Trang EJS: http://localhost:3000/news");
  console.log("REST API: http://localhost:3000/api/posts");
});
