const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// setup GET route for the root URL / to get all post to display on the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["date_created", "DESC"]],
    });
    console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));

    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//       res.redirect('/');
//       return;
//     }

//     res.render('login');
//   });

module.exports = router;
