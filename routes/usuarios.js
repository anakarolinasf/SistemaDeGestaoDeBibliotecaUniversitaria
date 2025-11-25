const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// Rota base: /usuarios
router.get('/', usuarioController.listar);
router.get('/criar', usuarioController.criarForm);
router.post('/salvar', usuarioController.salvar);
router.get('/editar/:id', usuarioController.editarForm);
router.post('/editar', usuarioController.editar);
router.get('/deletar/:id', usuarioController.deletar);

module.exports = router;
