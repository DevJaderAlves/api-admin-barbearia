
const prisma = require('../prismaClient');

exports.bloquearDia = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Data é obrigatória.' });
  }

  try {
    const bloqueioExistente = await prisma.bloqueioDia.findFirst({
      where: { data }
    });

    if (bloqueioExistente) {
      return res.status(400).json({ error: 'Esse dia já está bloqueado.' });
    }

    const novoBloqueio = await prisma.bloqueioDia.create({
      data: { data }
    });

    res.status(201).json(novoBloqueio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao bloquear dia.' });
  }
};

exports.listarDiasBloqueados = async (req, res) => {
  try {
    const dias = await prisma.bloqueioDia.findMany();
    res.json(dias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar dias bloqueados.' });
  }
};

exports.desbloquearDia = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.bloqueioDia.delete({ where: { id: Number(id) } });
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
    const bloqueioExistente = await prisma.bloqueioHorario.findFirst({
      where: { data, horario }
    });

    if (bloqueioExistente) {
      return res.status(400).json({ error: 'Esse horário já está bloqueado.' });
    }

    const novoBloqueio = await prisma.bloqueioHorario.create({
      data: { data, horario }
    });

    res.status(201).json(novoBloqueio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao bloquear horário.' });
  }
};

exports.listarHorariosBloqueados = async (req, res) => {
  try {
    const horarios = await prisma.bloqueioHorario.findMany();
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar horários bloqueados.' });
  }
};

exports.desbloquearHorario = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.bloqueioHorario.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao desbloquear horário.' });
  }
};
