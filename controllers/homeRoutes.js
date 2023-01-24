const router = require('express').Router();
const { Router } = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// setup GET route for the root URL / to get all post to display on the homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: { exclude: ['password', 'email']},
            order: [
                ['date_created', 'DESC']
            ]
        });
        
        const posts = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router
