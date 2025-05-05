const connection = require('../database/connection');

// Criar novo funcionário
const criarFuncionario = async (req, res) => {
    const { nome, foto } = req.body;

    if (!nome || !foto) {
        return res.status(400).json({ error: 'Nome e foto são obrigatórios.' });
    }

    try {
        const [result] = await connection.execute(
            'INSERT INTO Funcionarios (nome, foto) VALUES (?, ?)',
            [nome, foto]
        );

        return res.status(201).json({ id: result.insertId, nome, foto });
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Listar todos funcionários
const listarFuncionarios = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM Funcionarios');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Deletar funcionário
const deletarFuncionario = async (req, res) => {
    const { id } = req.params;

    try {
        await connection.execute('DELETE FROM Funcionarios WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Funcionário deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    criarFuncionario,
    listarFuncionarios,
    deletarFuncionario,
};
