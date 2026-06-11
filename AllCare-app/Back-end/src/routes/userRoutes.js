import express from "express";
import db from "../config/db.js";

const router = express.Router();

function normalizeDate(value) {
  if (!value) return null;
  const cleaned = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;
  const match = cleaned.match(/^(\d{2})\/?(\d{2})\/?(\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  return null;
}

router.get("/", async (_req, res) => {
  try {
    const [usuarios] = await db.query(
      `SELECT usr_id, usr_name, usr_mail, usr_birthday, usr_cpf, usr_address_state,
              usr_address_city, usr_adress_streetname, usr_adress_cep, usr_address_number,
              usr_address_neighborhood, usr_pwd, tipo_usuario, telefone, criado_em
       FROM usuario
       ORDER BY usr_id DESC`
    );
    return res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários.", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body || {};
    const nome = data.nome || data.usr_name || "Usuário AllCare";
    const email = data.email || data.usr_mail;
    const senha = data.senha || data.usr_pwd;

    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const params = {
      nome,
      email: String(email).trim().toLowerCase(),
      senha,
      dataNascimento: normalizeDate(data.dataNascimento || data.usr_birthday),
      cpf: data.cpf || data.usr_cpf || "",
      estado: data.estado || data.usr_address_state || "SP",
      cidade: data.cidade || data.usr_address_city || "",
      endereco: data.endereco || data.usr_adress_streetname || "",
      cep: data.cep || data.usr_adress_cep || "",
      numero: data.numero || data.usr_address_number || "",
      tipoEndereco: data.tipoEndereco || data.usr_address_type || "Casa",
      bairro: data.bairro || data.usr_address_neighborhood || "",
      tipoUsuario: data.tipoUsuario || data.tipo_usuario || "contratante",
      telefone: data.telefone || "",
    };

    const [result] = await db.query(
      `INSERT INTO usuario
        (usr_name, usr_mail, usr_birthday, usr_cpf, usr_address_country, usr_address_state,
         usr_address_city, usr_adress_streetname, usr_adress_cep, usr_address_number,
         usr_address_type, usr_address_neighborhood, usr_pwd, tipo_usuario, telefone)
       VALUES (?, ?, ?, ?, 'Brasil', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         usr_name = VALUES(usr_name),
         usr_birthday = VALUES(usr_birthday),
         usr_cpf = VALUES(usr_cpf),
         usr_address_state = VALUES(usr_address_state),
         usr_address_city = VALUES(usr_address_city),
         usr_adress_streetname = VALUES(usr_adress_streetname),
         usr_adress_cep = VALUES(usr_adress_cep),
         usr_address_number = VALUES(usr_address_number),
         usr_address_type = VALUES(usr_address_type),
         usr_address_neighborhood = VALUES(usr_address_neighborhood),
         usr_pwd = VALUES(usr_pwd),
         tipo_usuario = VALUES(tipo_usuario),
         telefone = VALUES(telefone)`,
      [
        params.nome,
        params.email,
        params.dataNascimento,
        params.cpf,
        params.estado,
        params.cidade,
        params.endereco,
        params.cep,
        params.numero,
        params.tipoEndereco,
        params.bairro,
        params.senha,
        params.tipoUsuario,
        params.telefone,
      ]
    );

    return res.status(result.insertId ? 201 : 200).json({
      message: result.insertId
        ? "Usuário cadastrado com sucesso."
        : "Usuário atualizado com sucesso.",
      id: result.insertId || null,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ message: "Erro ao cadastrar usuário.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha, password } = req.body || {};
    const senhaDigitada = senha || password;

    if (!email || !senhaDigitada) {
      return res.status(400).json({ message: "Informe e-mail e senha." });
    }

    const [usuarios] = await db.query(
      `SELECT usr_id, usr_name, usr_mail, tipo_usuario, telefone
       FROM usuario
       WHERE LOWER(usr_mail) = LOWER(?) AND usr_pwd = ?
       LIMIT 1`,
      [email, senhaDigitada]
    );

    if (!usuarios.length) {
      return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    return res.json({ message: "Login realizado com sucesso.", user: usuarios[0] });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro ao fazer login.", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM usuario WHERE usr_id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Usuário não encontrado." });
    return res.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir usuário.", error: error.message });
  }
});

export default router;
