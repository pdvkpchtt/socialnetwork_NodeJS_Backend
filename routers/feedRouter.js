const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/createpost").post(async (req, res) => {
  const postId = new Date().valueOf();
  const post = await pool.query(
    "INSERT INTO posts(id, title, text, user_id) values($1,$2,$3,$4)",
    [postId, req.body.data.headState, req.body.data.textState, req.body.userId]
  );
});

router.route("/getallposts").post(async (req, res) => {
  const posts = await pool.query(
    "select posts.*, users.name from posts join users on users.id = posts.user_id ORDER BY posts.id DESC LIMIT 8 OFFSET $1",
    [req.body.cursor]
  );
  // console.log(posts.rows);
  res.send({ data: posts.rows });
});

module.exports = router;

router.route("/deletepost").post(async (req, res) => {
  const posts = await pool.query("delete from posts where posts.id = $1", [
    req.body.postId,
  ]);
});

module.exports = router;
