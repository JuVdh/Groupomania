const DataTypes = require('sequelize');
const db = require('../config/database');
 
const post = db.define('Post', {
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

module.exports = post;