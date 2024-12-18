const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const News = sequelize.define('News', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    akimat_id: { // Foreign key to the Akimat model
        type: DataTypes.INTEGER,
        allowNull: false,
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
    image_url: { // New field
        type: DataTypes.STRING,
        allowNull: true, // Can be optional
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    tableName: 'news',
});

News.associate = (models) => {
    News.belongsTo(models.Akimat, { foreignKey: 'akimat_id', as: 'akimat' });
};

module.exports = News;
