const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Akimat = sequelize.define('Akimat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Root Akimats won't have a parent
        references: {
            model: 'akimats', // Reference the same table
            key: 'id',
        },
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
    region_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region_name_kk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region_name_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    region_description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    region_description_kk: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    region_description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    head_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    head_name_kk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    head_name_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    head_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    head_description_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    head_description_kk: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    head_description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'akimats',
});

Akimat.associate = (models) => {
    Akimat.hasMany(models.Akimat, {
        foreignKey: 'parent_id',
        as: 'child_akimats',
    });

    Akimat.belongsTo(models.Akimat, {
        foreignKey: 'parent_id',
        as: 'parent_akimat',
    });

    Akimat.hasMany(models.News, { foreignKey: 'akimat_id', as: 'news' });
};

module.exports = Akimat;
