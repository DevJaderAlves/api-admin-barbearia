const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- adicionar essa linha

router.use(authMiddleware); // <-- proteger todas as rotas abaixo

// Listar agendamentos por funcionário
router.get('/', agendamentoController.listarAgendamentosPorFuncionario);

// Criar novo agendamento
router.post('/', agendamentoController.criarAgendamento);

// Deletar agendamento
router.delete('/:id', agendamentoController.deletarAgendamento);

// Listar todos agendamentos (admin dashboard)
router.get('/todos', agendamentoController.listarTodosAgendamentos);

router.put('/:id', agendamentoController.atualizarStatusAgendamento);

module.exports = router;




