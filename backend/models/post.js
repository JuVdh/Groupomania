const DataTypes = require('sequelize');
const Db = require('../config/database');
 
const Post = Db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  attachment: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, 
{
  freezeTableName: true
});

module.exports = Post;