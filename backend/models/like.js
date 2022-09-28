const DataTypes = require('sequelize');
const Db = require('../config/database');

const Like = Db.define('likes', {
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, 
{
  freezeTableName: true
});

module.exports = Like;