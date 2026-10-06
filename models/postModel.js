const db = require("../config/db");

async function getAllPosts() {
  const [rows] = await db.query("SELECT * FROM posts ORDER BY id ASC");
  return rows;
}

async function getPostById(id) {
  const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
  return rows[0];
}

async function searchPosts(keyword) {
  const value = `%${keyword}%`;
  const [rows] = await db.query(
    "SELECT * FROM posts WHERE title LIKE ? OR description LIKE ? ORDER BY id ASC",
    [value, value]
  );
  return rows;
}

async function createPost(title, description) {
  const [result] = await db.query(
    "INSERT INTO posts(title, description) VALUES (?, ?)",
    [title, description]
  );
  return result.insertId;
}

async function updatePost(id, title, description) {
  await db.query(
    "UPDATE posts SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
}

async function deletePost(id) {
  await db.query("DELETE FROM posts WHERE id = ?", [id]);
}

module.exports = {
  getAllPosts,
  getPostById,
  searchPosts,
  createPost,
  updatePost,
  deletePost
};
