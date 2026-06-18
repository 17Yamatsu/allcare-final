import express from "express";
import db from "../config/db.js";

const router = express.Router();

async function garantirTabelaChat() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS chat_negociacao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      autor VARCHAR(50) NOT NULL,
      mensagem TEXT NOT NULL,
      valor_negociado DECIMAL(10,2) NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

function normalizarValor(valorRecebido) {
  if (valorRecebido === undefined || valorRecebido === null || valorRecebido === "") {
    return null;
  }

  if (typeof valorRecebido === "number") {
    return Number.isFinite(valorRecebido) ? valorRecebido : null;
  }

  const limpo = String(valorRecebido)
    .replace(/R\$/gi, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^0-9.]/g, "");

  const numero = Number(limpo);
  return Number.isFinite(numero) ? numero : null;
}

router.get("/mensagens", async (_req, res) => {
  try {
    await garantirTabelaChat();

    const [mensagens] = await db.query(
      `SELECT id, autor, mensagem, valor_negociado, criado_em
       FROM chat_negociacao
       ORDER BY id ASC`
    );

    if (!mensagens.length) {
      const mensagensIniciais = [
        ["Contratante", "Olá! Gostaria de negociar um atendimento domiciliar.", null],
        ["Cuidador", "Olá! Claro. Qual seria o horário e a necessidade do paciente?", null],
        ["Contratante", "Seria de segunda a sexta, das 8h às 17h. Podemos combinar o valor?", null],
      ];

      await db.query(
        "INSERT INTO chat_negociacao (autor, mensagem, valor_negociado) VALUES ?",
        [mensagensIniciais]
      );

      const [novasMensagens] = await db.query(
        `SELECT id, autor, mensagem, valor_negociado, criado_em
         FROM chat_negociacao
         ORDER BY id ASC`
      );

      return res.json(novasMensagens);
    }

    return res.json(mensagens);
  } catch (error) {
    console.error("Erro ao buscar mensagens do chat:", error);
    return res.status(500).json({
      message: "Erro ao buscar mensagens do chat.",
      error: error.message,
    });
  }
});

router.post("/mensagens", async (req, res) => {
  try {
    await garantirTabelaChat();

    const { autor, mensagem, valorNegociado, valor_negociado } = req.body || {};

    if (!autor || !String(autor).trim()) {
      return res.status(400).json({ message: "Autor é obrigatório." });
    }

    if (!mensagem || !String(mensagem).trim()) {
      return res.status(400).json({ message: "Mensagem é obrigatória." });
    }

    const valor = normalizarValor(valorNegociado ?? valor_negociado);

    const [result] = await db.query(
      "INSERT INTO chat_negociacao (autor, mensagem, valor_negociado) VALUES (?, ?, ?)",
      [String(autor).trim(), String(mensagem).trim(), valor]
    );

    const [mensagens] = await db.query(
      `SELECT id, autor, mensagem, valor_negociado, criado_em
       FROM chat_negociacao
       WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      message: "Mensagem enviada com sucesso.",
      item: mensagens[0],
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem do chat:", error);
    return res.status(500).json({
      message: "Erro ao enviar mensagem do chat.",
      error: error.message,
    });
  }
});

router.delete("/mensagens", async (_req, res) => {
  try {
    await garantirTabelaChat();
    await db.query("DELETE FROM chat_negociacao");
    return res.json({ message: "Histórico do chat apagado." });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao apagar chat.",
      error: error.message,
    });
  }
});

export default router;
