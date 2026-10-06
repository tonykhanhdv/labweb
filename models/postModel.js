const db = require("../config/db");

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

async function getAllPosts() {
  return all("SELECT * FROM posts ORDER BY id ASC");
}

async function getPostById(id) {
  return get("SELECT * FROM posts WHERE id = ?", [id]);
}

async function searchPosts(keyword) {
  const value = `%${keyword}%`;
  return all(
    "SELECT * FROM posts WHERE title LIKE ? OR description LIKE ? ORDER BY id ASC",
    [value, value]
  );
}

async function createPost(title, description) {
  const result = await run(
    "INSERT INTO posts(title, description) VALUES (?, ?)",
    [title, description]
  );
  return result.lastID;
}

async function updatePost(id, title, description) {
  return run(
    "UPDATE posts SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
}

async function deletePost(id) {
  return run("DELETE FROM posts WHERE id = ?", [id]);
}

module.exports = {
  getAllPosts,
  getPostById,
  searchPosts,
  createPost,
  updatePost,
  deletePost
};
