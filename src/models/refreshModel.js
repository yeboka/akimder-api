// models/refreshTokenModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const RefreshToken = sequelize.define('RefreshToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = RefreshToken;
