
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

// Registrar admin
const registerAdmin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await connection.execute(
      'INSERT INTO Admins (email, senha_hash) VALUES (?, ?)', // <- Corrigido aqui
      [email, hashedPassword]
    );
    return res.status(201).json({ message: 'Admin registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao registrar admin.' });
  }
};

// Login do admin
const loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM Admins WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Admin não encontrado.' });
    }

    const admin = rows[0];
    const senhaValida = await bcrypt.compare(senha, admin.senha_hash); // <- Corrigido aqui também

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    return res.json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no login.' });
  }
};

module.exports = { registerAdmin, loginAdmin };

