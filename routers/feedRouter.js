const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/createpost").post(async (req, res) => {
  const postId = new Date().valueOf();
  const post = await pool.query(
    "INSERT INTO posts(id, title, text, user_id, category_id) values($1,$2,$3,$4,$5)",
    [
      postId,
      req.body.data.headState,
      req.body.data.textState,
      req.body.userId,
      req.body.data.dropDownState.id,
    ]
  );
});

router.route("/getcategories").post(async (req, res) => {
  const categories = await pool.query("SELECT * from category");
  res.json({ data: categories.rows });
});

module.exports = router;
