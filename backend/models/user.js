const DataTypes = require('sequelize');
const Db = require('../config/database');

const User = Db.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin : {
    type: DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue: false
  }
}, 
{
  freezeTableName: true
});

module.exports = User;