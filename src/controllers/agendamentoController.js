const connection = require('../database/connection');

// Criar novo agendamento
const criarAgendamento = async (req, res) => {
    const { nome_cliente, telefone_cliente, servico, data, horario } = req.body;

    if (!nome_cliente || !telefone_cliente || !servico || !funcionario_id || !data || !horario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [result] = await connection.execute(
            `INSERT INTO Agendamentos 
             (nome_cliente, telefone_cliente, servico, data, horario) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome_cliente, telefone_cliente, servico, data, horario]
        );

        return res.status(201).json({ id: result.insertId, nome_cliente, telefone_cliente, servico, data, horario });
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Deletar agendamento
const deletarAgendamento = async (req, res) => {
    const { id } = req.params;

    try {
        await connection.execute('DELETE FROM Agendamentos WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar agendamento:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

//rota usada para atualizar o status de um agendamento
const atualizarStatusAgendamento = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório.' });
    }
  
    try {
      const [result] = await connection.execute(
        'UPDATE Agendamentos SET status = ? WHERE id = ?',
        [status, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Agendamento não encontrado.' });
      }
  
      return res.json({ message: 'Status do agendamento atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar status do agendamento.' });
    }
  };
  

  // Listar todos agendamentos (não filtrado por funcionário)
const listarTodosAgendamentos = async (req, res) => {
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM Agendamentos ORDER BY data ASC, horario ASC'
      );
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao listar todos agendamentos:', error);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  };
  

module.exports = {
    criarAgendamento,
    deletarAgendamento,
    atualizarStatusAgendamento,
    listarTodosAgendamentos
};



