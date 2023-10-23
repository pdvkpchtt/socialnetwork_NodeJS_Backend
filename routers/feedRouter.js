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

router.route("/deletepost").post(async (req, res) => {
  const posts = await pool.query("delete from posts where posts.id = $1", [
    req.body.postId,
  ]);
});

router.route("/getreactions").post(async (req, res) => {
  const posts = await pool.query("select * from reactions where post_id = $1", [
    req.body.postId,
  ]);

  res.send({ data: posts.rows });
});

router.route("/createreaction").post(async (req, res) => {
  const isreaction = await pool.query(
    "SELECT * FROM public.reactions where user_id = $2 and type = $1 and post_id = $3",
    [req.body.type, req.body.userId, req.body.postId]
  );

  if (isreaction.rowCount > 0) {
    const posts = await pool.query(
      "delete from reactions where user_id = $1 and post_id = $2 and type = $3",
      [req.body.userId, req.body.postId, req.body.type]
    );
  } else {
    const reactionId = new Date().valueOf();
    const posts = await pool.query(
      "INSERT INTO reactions(id, type, user_id, post_id) values($1,$2,$3,$4)",
      [reactionId, req.body.type, req.body.userId, req.body.postId]
    );
  }
});

module.exports = router;
