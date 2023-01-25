const router = require("express").Router();
const { Post } = require("../../models");
// const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
  console.log(req.session);
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.session.user_id);
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
