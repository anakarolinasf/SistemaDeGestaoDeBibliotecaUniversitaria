const { Sequelize } = require('sequelize');
const db = require('./db');

const Livro = db.define('Livro', {
    id_livro: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING
    },
    ano_publicacao: {
        type: Sequelize.INTEGER
    },
    categoria: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'livro',
    timestamps: false
});

module.exports = Livro;
