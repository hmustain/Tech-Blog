// creating seed.js file. looked at prev activities and documentation for this
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.js');
const postData = require('./postData');
const commentData = require('./commentData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

// had to use object.value method to convert my postData file to an array to allow the forEach method to work
// https://masteringjs.io/tutorials/fundamentals/foreach-object
Object.values(postData).forEach(async (post) => {
  await Post.create({
      ...post,
  });
});


// had to use object.value method to convert my commentData file to an array to allow the forEach method to work
// https://masteringjs.io/tutorials/fundamentals/foreach-object
  Object.values(commentData).forEach(async (comment) => {
    await Comment.create({
        ...comment,
    });
  });

  process.exit(0);
};

seedDatabase();
