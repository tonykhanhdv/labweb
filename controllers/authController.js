function showLogin(req, res) {
  res.render("auth/login", {
    message: "",
    user: req.session.user || null
  });
}

async function login(req, res) {
  const userModel = require("../models/userModel");
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.render("auth/login", {
        message: "Sai username hoặc password",
        user: null
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      fullname: user.fullname
    };

    res.redirect("/news");
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi khi đăng nhập");
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = { showLogin, login, logout };
