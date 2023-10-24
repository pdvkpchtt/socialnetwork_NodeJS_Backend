const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("").post(async (req, res) => {
  const existingUser = await pool.query(
    "SELECT id, name, about, location, birth from users WHERE id=$1",
    [req.body.userId]
  );

  if (existingUser.rowCount > 0) {
    res.json({
      success: true,
      status: "Пользователь найен",
      user: existingUser.rows[0],
    });
  } else {
    res.json({ success: false, status: "Пользователь не найен" });
  }
});

router.route("/edit").post(async (req, res) => {
  const existingUser = await pool.query(
    "SELECT name, about, location, birth from users WHERE id=$1",
    [req.body.userId]
  );

  if (existingUser.rowCount > 0) {
    const updateUser = await pool.query(
      "UPDATE users SET name = $1, about = $2, location = $3, birth = $4 WHERE users.id = $5",
      [
        req.body.data.name,
        req.body.data.about,
        req.body.data.location,
        req.body.data.birth,
        req.body.userId,
      ]
    );

    res.json({
      success: true,
      status: "Пользователь изменен",
    });
  } else {
    res.json({ success: false, status: "Пользователь не найен" });
  }
});

router.route("/getuserposts").post(async (req, res) => {
  const posts = await pool.query(
    "select posts.*, users.name from posts join users on users.id = posts.user_id where user_id = $1 ORDER BY posts.id DESC LIMIT 8 OFFSET $2",
    [req.body.userId, req.body.cursor]
  );
  res.send({ data: posts.rows });
});

module.exports = router;
