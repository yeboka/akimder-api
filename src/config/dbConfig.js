const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Connection to the database has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
