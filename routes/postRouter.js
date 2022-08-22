const express = require("express");
const router = express();
const PostModel = require("../models/posts");
router.use(express.json());
// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({}).populate("author")
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done get post by id
router.get("/:id", async (req, res) => {
  try {
    const postById = await PostModel.find({ _id: req.params.id }).populate("author");
    res.status(200).json(postById);
  } catch (error) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done Update post by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await PostModel.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "updated", doc });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done add post with req.body
router.post("/", async (req, res) => {
  const postData = req.body;
  const post = new PostModel(postData);
  try {
    const savedPost = await post.save();
    res.json(savedPost)
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done delete post by id
router.delete("/:id",async (req, res) => {
  try {
    const deletedPost = await PostModel.findOneAndRemove({ _id: req.params.id })
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});
module.exports = router;
