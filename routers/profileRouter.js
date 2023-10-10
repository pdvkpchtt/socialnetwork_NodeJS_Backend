const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("").post(async (req, res) => {
  const existingUser = await pool.query(
    "SELECT name, about, location, birth from users WHERE id=$1",
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

module.exports = router;
