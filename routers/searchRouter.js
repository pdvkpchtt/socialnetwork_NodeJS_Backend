const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/getusers").post(async (req, res) => {
  const users = await pool.query(
    "select * from users ORDER BY id DESC LIMIT 10 OFFSET $1",
    [req.body.cursor]
  );

  res.send({ data: users.rows });
});

module.exports = router;
