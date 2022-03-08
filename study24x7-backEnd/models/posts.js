const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: { type: String, ref: "User" },
  post: { type: String },
  created: { type: String, default: Date() },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, ref: "User" },
      likedAt: { type: String, default: Date() },
    },
  ],
  totalLikes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, ref: "User" },
      comment: { type: String, default: "" },
      commentedAt: { type: String, default: Date() },
    },
  ],
  totalComments: { type: Number, default: 0 },
});

module.exports = mongoose.model("post", postSchema);
