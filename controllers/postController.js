const postModel = require("../models/postModel");

async function index(req, res) {
  try {
    const posts = await postModel.getAllPosts();
    res.render("posts/index", { posts, user: req.session.user || null });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi khi lấy danh sách bài viết");
  }
}

module.exports = { index };
