const dotenv = require('dotenv').config();
import * as Sequelize from 'sequelize';

export const development = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // Defaults for Postgres
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "mysql",
    "logging": false
};

export const production = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    port: 5432,
    dialect: "mysql",
    logging: false
};

export const sequelize = new Sequelize(this.development.database, this.development.username, this.development.password, {
    dialect: this.development.dialect,
    port: 3306,
    host: process.env.DB_HOST
});

sequelize.authenticate();

// export const facebook = {
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_SECRET,
//     callbackURL: 'http://localhost:3000/auth/facebook/callback',
//     profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
// };
//
// export const google = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_SECRET,
//     callbackURL: 'http://localhost:3000/auth/google/callback',
// };
