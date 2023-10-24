const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/getusers").post(async (req, res) => {
  const users = await pool.query(
    "select * from users where name like $2 ORDER BY id DESC LIMIT 8 OFFSET $1",
    [req.body.cursor, `%${req.body.input}%`]
  );

  res.send({ data: users.rows });
});

module.exports = router;
