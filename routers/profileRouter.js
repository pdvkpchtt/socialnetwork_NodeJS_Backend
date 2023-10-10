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

module.exports = router;
