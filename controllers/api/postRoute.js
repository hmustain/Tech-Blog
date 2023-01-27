const router = require("express").Router();
const { Post } = require("../../models");
// const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
      const allPosts = await Post.find();
      console.log(allPosts)
      res.status(200).json(allPosts);
  } catch (err) {
      res.status(400).json(err);
  }
});


router.post("/", async (req, res) => {
  console.log(req.session);
  if (!req.session.user_id) {
    return res.status(400).json({ message: "You must be logged in to post!" });
  }
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

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({ 
      title: req.body.title ,
      content: req.body.content ,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    res.status(200).json(postData);
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
