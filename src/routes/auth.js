// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'segredo-muito-seguro';

router.post('/login', (req, res) => {
  const { senha } = req.body;

  // Aqui você define a senha correta (igual da barbearia)
  const senhaCorreta = process.env.ADMIN_PASSWORD || 'marujo';

  if (senha === senhaCorreta) {
    const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Senha incorreta' });
  }
});

module.exports = router;
