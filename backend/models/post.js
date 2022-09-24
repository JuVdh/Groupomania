const DataTypes = require('sequelize');
const Db = require('../config/database');
 
const Post = Db.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: null
    //allowNull: false
  },
  attachment: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}, 
{
  freezeTableName: true
});

module.exports = Post;