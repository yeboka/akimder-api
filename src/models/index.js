const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Akimat = require('./akimatModel');
const News = require('./newsModel');
const Advertisement = require('./advertisementModel');

// Все модели
const models = {
  Akimat: Akimat,
  News: News,
  Advertisement: Advertisement,
};

// Устанавливаем ассоциации
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
