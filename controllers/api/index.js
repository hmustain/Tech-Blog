const router = require('express').Router();
const commentRoute = require('./commentRoute');
const postRoute = require('./postRoute');
const userRoute = require('./userRoute');

router.use('/comments', commentRoute);
router.use('/posts', postRoute);
router.use('/users', userRoute);

module.exports = router
