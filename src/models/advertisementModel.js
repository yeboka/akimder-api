const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Advertisement = sequelize.define('Advertisement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING, // Optional: Additional description for the ad
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Only show active advertisements
    },
}, {
    timestamps: true,
    tableName: 'advertisements',
});

module.exports = Advertisement;
