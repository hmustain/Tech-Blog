const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user-id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user-id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post-id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user-id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post-id',
});

Comment.belongsTo(User, {
    foreignKey: 'user-id',
});

module.exports = { Comment, Post, User };
