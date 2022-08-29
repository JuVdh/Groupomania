const { Sequelize } = require('sequelize');

// TODO
// 1. export the Database variables from a config file
// 2. create a new user. in the production environment never use the default user
 
module.exports =  new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PW, {
  dialect: 'mariadb',
  host: 'localhost',
});