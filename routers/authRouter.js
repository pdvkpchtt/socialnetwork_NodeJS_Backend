const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/register").post(async (req, res) => {
  const existingUser = await pool.query(
    "SELECT name from users WHERE name=$1",
    [req.body.username]
  );

  const newUserId = new Date().valueOf();

  if (existingUser.rowCount === 0) {
    // register
    const newUserQuery = await pool.query(
      "INSERT INTO users(name, password, id) values($1,$2,$3)",
      [req.body.username, req.body.password, newUserId]
    );

    res.json({ loggedIn: true, id: newUserId });
  } else {
    res.json({ loggedIn: false, status: "Имя занято" });
  }
});

router.route("/login").post(async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, name, password FROM users u WHERE u.name=$1",
    [req.body.username]
  );

  if (potentialLogin.rowCount > 0) {
    if (req.body.password === potentialLogin.rows[0].password) {
      req.session.user = {
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Неравильное имя или пароль" });
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Неравильное имя или пароль" });
  }
});

module.exports = router;
