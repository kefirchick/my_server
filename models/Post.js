const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comment = require('./Comment');

const Post = sequelize.define('post', {
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Post.hasMany(Comment);

module.exports = Post;