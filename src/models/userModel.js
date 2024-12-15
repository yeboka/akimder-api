// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Assuming you have a configured Sequelize instance

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING, // You can adjust the type based on your needs (STRING or INTEGER)
        allowNull: false,
        unique: true, // Ensure phone number is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
});

module.exports = User;
