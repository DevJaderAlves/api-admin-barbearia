const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- linha 1: importar

router.use(authMiddleware); // <-- linha 2: proteger todas as rotas abaixo

// Rota para listar funcionários
router.get('/', funcionarioController.listarFuncionarios);

// Rota para criar funcionário
router.post('/', funcionarioController.criarFuncionario);

// Rota para deletar funcionário
router.delete('/:id', funcionarioController.deletarFuncionario);

module.exports = router;

