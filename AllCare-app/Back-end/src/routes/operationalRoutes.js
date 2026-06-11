import express from "express";
import db from "../config/db.js";

const router = express.Router();

function required(res, fields, data) {
  const missing = fields.filter((field) => !data[field]);
  if (missing.length) {
    res.status(400).json({ message: `Campos obrigatórios: ${missing.join(", ")}` });
    return false;
  }
  return true;
}

router.get("/agendamentos", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM agendamentos ORDER BY data_consulta DESC, horario DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos.", error: error.message });
  }
});

router.post("/agendamentos", async (req, res) => {
  try {
    const data = req.body || {};
    if (!required(res, ["paciente", "cuidador", "data_consulta", "horario", "endereco"], data)) return;

    const [result] = await db.query(
      `INSERT INTO agendamentos
        (usuario_id, paciente, cuidador, especialidade, data_consulta, horario, endereco, observacoes, valor, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.usuario_id || null,
        data.paciente,
        data.cuidador,
        data.especialidade || "Cuidador domiciliar",
        data.data_consulta,
        data.horario,
        data.endereco,
        data.observacoes || "",
        data.valor || 0,
        data.status || "Agendado",
      ]
    );

    res.status(201).json({ message: "Agendamento criado com sucesso.", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar agendamento.", error: error.message });
  }
});

router.put("/agendamentos/:id/status", async (req, res) => {
  try {
    const status = req.body?.status || "Concluído";
    const [result] = await db.query("UPDATE agendamentos SET status = ? WHERE id = ?", [status, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Agendamento não encontrado." });
    res.json({ message: "Status atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar status.", error: error.message });
  }
});

router.delete("/agendamentos/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM agendamentos WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Agendamento não encontrado." });
    res.json({ message: "Agendamento removido." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover agendamento.", error: error.message });
  }
});

router.get("/historico", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM historico_atendimentos ORDER BY data_atendimento DESC, id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar histórico.", error: error.message });
  }
});

router.post("/historico", async (req, res) => {
  try {
    const data = req.body || {};
    if (!required(res, ["paciente", "cuidador", "data_atendimento", "procedimentos"], data)) return;

    const [result] = await db.query(
      `INSERT INTO historico_atendimentos
       (agendamento_id, paciente, cuidador, data_atendimento, horario_inicio, horario_fim, procedimentos, observacoes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.agendamento_id || null,
        data.paciente,
        data.cuidador,
        data.data_atendimento,
        data.horario_inicio || null,
        data.horario_fim || null,
        data.procedimentos,
        data.observacoes || "",
        data.status || "Concluído",
      ]
    );

    res.status(201).json({ message: "Histórico salvo com sucesso.", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar histórico.", error: error.message });
  }
});

router.get("/avaliacoes", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM avaliacoes ORDER BY criado_em DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar avaliações.", error: error.message });
  }
});

router.post("/avaliacoes", async (req, res) => {
  try {
    const data = req.body || {};
    if (!required(res, ["avaliador", "cuidador", "nota"], data)) return;

    const nota = Number(data.nota);
    if (Number.isNaN(nota) || nota < 1 || nota > 5) {
      return res.status(400).json({ message: "A nota deve ser entre 1 e 5." });
    }

    const [result] = await db.query(
      `INSERT INTO avaliacoes (atendimento_id, agendamento_id, avaliador, cuidador, nota, comentario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.atendimento_id || null, data.agendamento_id || null, data.avaliador, data.cuidador, nota, data.comentario || ""]
    );

    res.status(201).json({ message: "Avaliação enviada com sucesso.", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar avaliação.", error: error.message });
  }
});

router.get("/familiares", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM familiares ORDER BY criado_em DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar familiares.", error: error.message });
  }
});

router.post("/familiares", async (req, res) => {
  try {
    const data = req.body || {};
    if (!required(res, ["nome", "parentesco"], data)) return;

    const [result] = await db.query(
      `INSERT INTO familiares (usuario_id, nome, parentesco, telefone, email, observacoes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.usuario_id || null, data.nome, data.parentesco, data.telefone || "", data.email || "", data.observacoes || ""]
    );

    res.status(201).json({ message: "Familiar cadastrado com sucesso.", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar familiar.", error: error.message });
  }
});

router.delete("/familiares/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM familiares WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Familiar não encontrado." });
    res.json({ message: "Familiar removido." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover familiar.", error: error.message });
  }
});

export default router;
