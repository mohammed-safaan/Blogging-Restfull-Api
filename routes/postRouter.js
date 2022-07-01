const express = require("express");
const router = express();
const PostModel = require("../models/posts");
router.use(express.json());
// Get All Posts
router.get("/", (req, res) => {
  // console.log(PostModel.populated('author'));
  PostModel.find({})
  .populate('author')
  .exec((err, posts) => {
    if (!err) return res.status(200).json(posts);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done get post by id
router.get("/:id", (req, res) => {
  PostModel.find({ _id: req.params.id })
  .populate('author')
  .exec((err, post) => {
    if (!err) return res.status(200).json(post);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done Update post by id
router.put("/:id", (req, res) => {
  PostModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    if (!err) return res.status(200).json(data);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done add post with req.body
router.post("/", (req, res) => {
  const postData = req.body;
  const post = new PostModel(postData);
  post.save((err, savedpost) => {
    if (!err) return res.json(savedpost);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done delete post by id
router.delete("/:id", (req, res) => {
  PostModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
    if (!err) return res.status(200).json(doc);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});
module.exports = router;
