const connection = require('../database/connection');

exports.bloquearDia = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Data é obrigatória.' });
  }

  try {
    const [existente] = await connection.execute(
      'SELECT * FROM BloqueioDia WHERE data = ?',
      [data]
    );

    if (existente.length > 0) {
      return res.status(400).json({ error: 'Esse dia já está bloqueado.' });
    }

    const [result] = await connection.execute(
      'INSERT INTO BloqueioDia (data) VALUES (?)',
      [data]
    );

    res.status(201).json({ id: result.insertId, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao bloquear dia.' });
  }
};

exports.listarDiasBloqueados = async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM BloqueioDia ORDER BY data ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar dias bloqueados.' });
  }
};

exports.desbloquearDia = async (req, res) => {
  const { id } = req.params;

  try {
    await connection.execute('DELETE FROM BloqueioDia WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao desbloquear dia.' });
  }
};

exports.bloquearHorario = async (req, res) => {
  const { data, horario } = req.body;

  if (!data || !horario) {
    return res.status(400).json({ error: 'Data e horário são obrigatórios.' });
  }

  try {
    const [existente] = await connection.execute(
      'SELECT * FROM BloqueioHorario WHERE data = ? AND horario = ?',
      [data, horario]
    );

    if (existente.length > 0) {
      return res.status(400).json({ error: 'Esse horário já está bloqueado.' });
    }

    const [result] = await connection.execute(
      'INSERT INTO BloqueioHorario (data, horario) VALUES (?, ?)',
      [data, horario]
    );

    res.status(201).json({ id: result.insertId, data, horario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao bloquear horário.' });
  }
};

exports.listarHorariosBloqueados = async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM BloqueioHorario ORDER BY data ASC, horario ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar horários bloqueados.' });
  }
};

exports.desbloquearHorario = async (req, res) => {
  const { id } = req.params;

  try {
    await connection.execute('DELETE FROM BloqueioHorario WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao desbloquear horário.' });
  }
};

