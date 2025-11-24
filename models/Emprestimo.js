const { Sequelize } = require('sequelize');
const db = require('./db');
const Usuario = require('./Usuario');
const Livro = require('./Livro');

const Emprestimo = db.define('Emprestimo', {
    id_emprestimo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    id_livro: {
        type: Sequelize.INTEGER,
        references: {
            model: 'livro', 
            key: 'id_livro'
        }
    },
    data_retirada: {
        type: Sequelize.DATEONLY
    },
    data_devolucao: {
        type: Sequelize.DATEONLY
    },
    multa: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'Emprestimos', 
    timestamps: false
});

Emprestimo.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Emprestimo.belongsTo(Livro, { foreignKey: 'id_livro' });

module.exports = Emprestimo;