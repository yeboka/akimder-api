const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Hello = sequelize.define('Hello', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Hellos', // Explicitly define the table name
});

module.exports = Hello;
