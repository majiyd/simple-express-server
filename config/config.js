require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'rootpassword',
    database: 'contactsDB_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'rootpassword',
    database: 'contactsDB_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
