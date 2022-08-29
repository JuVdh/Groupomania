const DataTypes = require('sequelize');
const db = require('../config/database');

const user = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // ?? isAdmin attribute
}, 
{
  freezeTableName: true
});

module.exports = user;