# Groupomania

This project was generated with [Vue CLI](https://cli.vuejs.org/config/) version 5.0.8.

## Import database

From the directory containing the Groupomania.sql file, run `mysql -u root -p < Groupomania.sql`.
To connect to the database, please use the template.env file to fill the .env file. 

## Running the backend

Install dependencies with `npm install` from the backend directory and run `nodemon server` to run the node server. To use this command, you need to first install [nodemon] by running `npm install -g nodemon`. The nodemon package will update the started server on every file change. The backend is listening on `http://localhost:3000/`.

## Running the frontend

Run `npm install -g @vue/cli` and `npm install` and then `npm run serve` from the frontend repository to run the application. Vue-CLI Development Server is listening on `localhost:8080`, open your browser on `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Creating an account and log in

A secure password meeting the following criteria is required: minimum 8 characters (between 8 and 100 characters), including uppercase and lowercase letters, at least 2 digits, without spaces, and different from the passwords Passw0rd1' and 'Password123'.

## Dotenv 

This file is put for educational purposes for the evaluation of this project by OpenClassrooms which would not be the case in production.

## Further help

To get more help on Vue CLI go check out the [Vue CLI Guide](https://cli.vuejs.org/guide/) page.
To get more help on Vue router go check out the [Vue router Guide](https://router.vuejs.org/guide/) page.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

