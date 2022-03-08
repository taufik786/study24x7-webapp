const Post = require("../models/posts");
const moment = require("moment");

module.exports = {
  // Create Post
  createPost(req, res) {
    if (req.body.post == "") {
      return res.status(403).json({
        message: "Blank Field Not Allowed",
      });
    }
    const post = new Post({
      userId: req.user._id,
      userName: req.user.name,
      post: req.body.post,
      created: new Date(),
    });

    post
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Post Created Successfully",
          result,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Post Not Created",
          err,
        });
      });
  },

  // All Post
  AllPost(req, res) {
    try {
      //  moment
      // var moment1 = moment().format("DD-MMM-YY, h:mm:ss a");
      // console.log(moment1,)
      Post.find()
        .sort({ created: 1 })
        .then((result) => {
          return res.status(200).json({
            message: "All Post Showing!!",
            result,
          });
        })
        .catch((err) => {
          return res.status(403).json({
            message: "All Post Not Getting!!",
            err,
          });
        });
    } catch (error) {}
  },

  // Single Post
  async SinglePost(req, res) {
    const postId = await req.params.id;
    Post.findOne({ _id: postId })
      .then((result) => {
        return res.status(200).json({
          message: "Single Post Fetched",
          result,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Single Post Not Fetched",
          err,
        });
      });
  },

  //Add Like
  AddLike(req, res) {
    Post.updateOne(
      {
        _id: req.body.id,
        "likes.userId": { $ne: req.user._id },
      },
      {
        $push: {
          likes: {
            userId: req.user._id,
            name: req.user.name,
            created: new Date(),
          },
        },
        $inc: {
          totalLikes: 1,
        },
      }
    )
      .then((result) => {
        return res.status(200).json({
          message: "Post Liked Successfully",
          result,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Post Not Liked Successfully",
          err,
        });
      });
  },

  // Dislike
  DisLike(req, res) {
    Post.findOneAndUpdate(
      {
        _id: req.body.id,
        "likes.userId": { $eq: req.user._id },
      },
      {
        $pull: {
          likes: {
            userId: req.user._id,
            name: req.user.name,
          },
        },
        $inc: {
          totalLikes: -1,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "Disliked post",
          result,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Not Disliked",
          err,
        });
      });
  },

  //Add Comment
  async AddComment(req, res) {
    await Post.updateOne(
      {
        _id: req.body.postId,
      },
      {
        $push: {
          comments: {
            userId: req.user._id,
            name: req.user.name,
            comment: req.body.commentTxt,
            commentedAt: new Date(),
          },
        },
        $inc: {
          totalComments: 1,
        },
      }
    )
      .then((result) => {
        return res.status(200).json({
          message: "Commented successfully",
          result,
        });
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Comment Failed",
          err,
        });
      });
  },
};
