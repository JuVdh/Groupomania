// Database
const Db = require('../config/database');

// DAO model
const User = require('./user');
const Post = require('./post');

let Init = async () => {
  try {
    await Db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  //Post.belongsTo(User, {onDelete: 'CASCADE'});
  //Démarre 2 tâches en parallèle et on attend que les deux soient finies

    await User.sync({alter: true});
    //await Post.sync({alter: true});

  // await post.create({
  //   title: 'Titre de mon premier post',
  //   content: 'mon premier post sur groupomania',
  //   likes: 1
  // });

  // await Promise.all([
  //   (async()=> await User.sync({force: true}))(),
  //   (async()=> await Post.sync({force: true}))()
  // ]);

  //return post;
}

module.exports = Init;