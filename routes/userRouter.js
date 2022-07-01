const express = require("express");
const router = express();
const UserModel = require("../models/users");

router.use(express.json());

// Done get all users
router.get("/", (req, res) => {
  // UserModel.getUserByFullName('Shady Ahmed',(err,data)=>{
  //   if(!err) console.log(data);
  //   res.json('Done')
  // })
  UserModel.find({}, (err, Users) => {
    if (!err) return res.status(200).json(Users);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done get user by id
router.get("/:id", (req, res) => {
  UserModel.find({ _id: req.params.id }, (err, User) => {
    if (!err) return res.status(200).json(User);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done Update user by id
router.put("/:id", (req, res) => {
  UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    if (!err) return res.status(200).json(data);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done add user with req.body
router.post("/", (req, res) => {
  const UserData = req.body;
  const User = new UserModel(UserData);
  // console.log(User.getUserFullName());
  User.save((err, savedUser) => {
    if (!err) return res.json(savedUser);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});

// Done delete user by id
router.delete("/:id", (req, res) => {
  UserModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
    if (!err) return res.status(200).json(doc);
    console.log(err);
    res.status(500).json({ code: "DB_ERROR" });
  });
});
module.exports = router;
