const DataTypes = require('sequelize');
const Db = require('../config/database');

const User = Db.define('User', {
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

module.exports = User;