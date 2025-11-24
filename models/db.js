const { Sequelize } = require('sequelize');

const db = new Sequelize('biblioteca_universitaria', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
