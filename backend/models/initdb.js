// Database
const db = require('../config/database');

// DAO model
const user = require('./user');
const post = require('./post');

let Init = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  //Démarre 2 tâches en parallèle et on attend que les deux soient finies
  // (async () => {
  //   await user.sync({force: true});
  //   await post.sync({force: true});
  // })();

  await post.create({
    title: 'Titre de mon premier post',
    content: 'mon premier post sur groupomania',
    likes: 1
  });

  // await Promise.all([
  //   (async()=> await User.sync({force: true}))(),
  //   (async()=> await Post.sync({force: true}))()
  // ]);

  return post;
}

module.exports = Init;