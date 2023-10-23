const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/getusers").post(async (req, res) => {
  const users = await pool.query("select * from users where name like '%$1%'", [
    req.body.input,
  ]);
});

module.exports = router;
