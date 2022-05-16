const Post = require("../models/posts");

module.exports = {
  async searchBox(req, res) {
    // let searchText = req.params.searchText;
    let searchText = new RegExp(req.params.searchText, "gi");
    // Post.find({post: searchText}).then(result =>{
    await Post.find({
      $or: [
        { post: searchText },
        { userName: searchText },
        { "comments.comment": searchText },
      ],
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            message: "Text matched successfully!",
            result,
          });
        } else {
          return res.status(404).json({
            message: "Text Not Found",
            result,
          });
        }
      })
      .catch((err) => {
        return res.status(404).json({
          message: "Not Found",
          err,
        });
      });
  },
};
