const connection = require('../database/connection');

// Bloquear um dia inteiro para um funcionário
const bloquearDia = async (req, res) => {
    const { funcionario_id, data } = req.body;

    if (!funcionario_id || !data) {
        return res.status(400).json({ error: 'Funcionário e data são obrigatórios.' });
    }

    try {
        await connection.execute(
            'INSERT INTO Dias_Bloqueados (funcionario_id, data) VALUES (?, ?)',
            [funcionario_id, data]
        );
        return res.status(201).json({ message: 'Dia bloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao bloquear dia:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Bloquear horário específico para um funcionário
const bloquearHorario = async (req, res) => {
    const { funcionario_id, data, horario } = req.body;

    if (!funcionario_id || !data || !horario) {
        return res.status(400).json({ error: 'Funcionário, data e horário são obrigatórios.' });
    }

    try {
        await connection.execute(
            'INSERT INTO Horarios_Bloqueados (funcionario_id, data, horario) VALUES (?, ?, ?)',
            [funcionario_id, data, horario]
        );
        return res.status(201).json({ message: 'Horário bloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao bloquear horário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Listar dias bloqueados
const listarDiasBloqueados = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM Dias_Bloqueados');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar dias bloqueados:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Listar horários bloqueados
const listarHorariosBloqueados = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM Horarios_Bloqueados');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar horários bloqueados:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Deletar um dia bloqueado
const desbloquearDia = async (req, res) => {
    const { id } = req.params;

    try {
        await connection.execute('DELETE FROM Dias_Bloqueados WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Dia desbloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao desbloquear dia:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Deletar um horário bloqueado
const desbloquearHorario = async (req, res) => {
    const { id } = req.params;

    try {
        await connection.execute('DELETE FROM Horarios_Bloqueados WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Horário desbloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao desbloquear horário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    bloquearDia,
    bloquearHorario,
    listarDiasBloqueados,
    listarHorariosBloqueados,
    desbloquearDia,
    desbloquearHorario,
};
