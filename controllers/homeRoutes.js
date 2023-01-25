const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// setup GET route for the root URL / to get all post to display on the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["date_created", "DESC"]],
      include: [{ model: User }]
    });
    console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

// go back and add withAuth here
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const post = postData.get({ plain: true });

      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // go back and add withAuth here
  router.get('/post/edit/:id', async (req, res) => {

    try {
  
      const postData = await Post.findByPk(req.params.id, {
        where: {
        user_id: req.session.user_id,
        },
      })
  
      const post = postData.get({ plain: true });
  
      console.log(post);
  
      res.render('editPost', { post } )
  
    } catch (err) {
      res.status(400).json(err);
    }
  
  });

  // Use withAuth middleware to prevent access to route
router.get('/dashboard', async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      req.session.user_id=1  
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', async (req, res) => {
    try {
      // Pass serialized data and session flag into template
      res.render('signup');
    } catch (err) {
      res.status(404).json(err);
    }
  });


module.exports = router;
