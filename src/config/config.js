"use strict";
exports.__esModule = true;
var dotenv = require('dotenv').config();
exports.development = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // Defaults for Postgres
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "mysql",
    "logging": false
};
exports.production = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    port: 5432,
    dialect: "mysql",
    logging: false
};
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
