// src/models/newsModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Akimat = require('./akimatModel'); // Reference to Akimat model

const News = sequelize.define('News', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    akimat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Akimat,   // Reference to Akimat model
            key: 'id',
        },
        onDelete: 'CASCADE',
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
    text_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text_kk: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    tableName: 'news',
});

module.exports = News;
