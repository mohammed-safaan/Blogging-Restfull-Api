const express = require("express");
const router = express();
const UserModel = require("../models/users");

router.use(express.json());

// Done get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done get user by id
router.get("/:id", async (req, res) => {
  try {
    const userById = await UserModel.find({ _id: req.params.id });
    res.status(200).json(userById);
  } catch (error) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done Update user by id
router.put("/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserModel.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "updated", doc });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done add user with req.body
router.post("/", async(req, res) => {
  const postData = req.body;
  const post = new UserModel(postData);
  try {
    const savedUser = await post.save();
    res.json(savedUser)
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});

// Done delete user by id
router.delete("/:id",async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndRemove({ _id: req.params.id })
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  }
});
module.exports = router;
