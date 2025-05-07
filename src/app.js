const express = require('express');
const cors = require('cors');
require('dotenv').config();

const funcionarioRoutes = require('./routes/funcionarioRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const bloqueioRoutes = require('./routes/bloqueioRoutes');
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', loginRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/funcionarios', authenticateToken, funcionarioRoutes);
app.use('/api/agendamentos', authenticateToken, agendamentoRoutes);
app.use('/api/bloqueios', authenticateToken, bloqueioRoutes);

module.exports = app;
