const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;