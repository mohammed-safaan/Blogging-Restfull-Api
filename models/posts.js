const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref:"users" },
});
const PostModel = new mongoose.model("posts", postSchema);
module.exports = PostModel;
