// creating seed.js file. looked at prev activities and documentation for this
console.log(__dirname);
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

// loop through post with for of post
for (const post of postData) {
  await Post.create({
    ...post
  });
}


// loop through the comments w/ a for of loop
for (const comment of commentData){
  await Comment.create({
    ...comment
  });
}
console.log(userData);
console.log(postData);
console.log(commentData);
  process.exit(0);
};

seedDatabase();
