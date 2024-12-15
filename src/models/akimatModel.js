// src/models/akimatModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Akimat = sequelize.define('Akimat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_kk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_kk: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    address_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_kk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contacts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'akimats',
});

module.exports = Akimat;
