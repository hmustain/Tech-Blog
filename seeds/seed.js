// creating seed.js file. looked at prev activities and documentation for this
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

// for loop that iterates through the object postData and creates a new post uses spread operator ('...') to spread the properties of the current oject in the array in tho the create method. this makes it to where each property is passed as an individual argument
  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }

  // for loop that iterates through the object postComment and creates a new comment uses spread operator ('...') to spread the properties of the current oject in the array in tho the create method. this makes it to where each property is passed as an individual argument
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
