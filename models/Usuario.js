const Sequelize = require('sequelize');
const db = require('./db');

const Usuario = db.define('Usuario', {
    id: {  
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_usuario'
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;
