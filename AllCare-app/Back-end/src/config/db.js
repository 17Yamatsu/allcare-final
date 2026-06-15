import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const databaseName = process.env.DB_NAME || "allcare";

export const pool = mysql.createPool({
  ...dbConfig,
  database: databaseName,
});

async function columnExists(connection, table, column) {
  const [rows] = await connection.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [databaseName, table, column]
  );
  return rows.length > 0;
}

async function addColumnIfMissing(connection, table, column, definition) {
  const exists = await columnExists(connection, table, column);
  if (!exists) {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN ${column} ${definition}`);
  }
}

async function tableExists(connection, table) {
  const [rows] = await connection.query(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [databaseName, table]
  );
  return rows.length > 0;
}

export async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  await connection.query(`USE \`${databaseName}\``);

  // Mantém o nome original do banco importado pelo seu TCC: usuario.
  await connection.query(`
    CREATE TABLE IF NOT EXISTS usuario (
      usr_id INT AUTO_INCREMENT PRIMARY KEY,
      usr_name VARCHAR(120) NOT NULL,
      usr_email VARCHAR(150) NOT NULL UNIQUE,
      usr_birthday DATE NULL,
      usr_cpf VARCHAR(20) NULL,
      usr_estado VARCHAR(2) NULL,
      usr_cidade VARCHAR(120) NULL,
      usr_rua VARCHAR(200) NULL,
      usr_cep VARCHAR(20) NULL,
      usr_numero VARCHAR(20) NULL,
      usr_complemento VARCHAR(50) DEFAULT 'Casa',
      usr_bairro VARCHAR(200) NULL,
      usr_pwd VARCHAR(100) NOT NULL,
      usr_photo MEDIUMBLOB NULL,
      tipo_usuario VARCHAR(40) DEFAULT 'contratante',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Caso a tabela usuario já exista antiga, adiciona as colunas usadas pelo app.
  await addColumnIfMissing(connection, "usuario", "tipo_usuario", "VARCHAR(40) DEFAULT 'contratante'");
  await addColumnIfMissing(connection, "usuario", "criado_em", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS mensagens_chat (
      id INT AUTO_INCREMENT PRIMARY KEY,
      autor VARCHAR(50) NOT NULL,
      mensagem TEXT NOT NULL,
      valor_negociado DECIMAL(10,2) NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  await addColumnIfMissing(connection, "mensagens_chat", "valor_negociado", "DECIMAL(10,2) NULL");
  await addColumnIfMissing(connection, "mensagens_chat", "criado_em", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP");


  await connection.query(`
    CREATE TABLE IF NOT EXISTS chat_negociacao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      autor VARCHAR(50) NOT NULL,
      mensagem TEXT NOT NULL,
      valor_negociado DECIMAL(10,2) NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NULL,
      paciente VARCHAR(120) NOT NULL,
      cuidador VARCHAR(120) NOT NULL,
      especialidade VARCHAR(120) DEFAULT 'Cuidador domiciliar',
      data_consulta DATE NOT NULL,
      horario TIME NOT NULL,
      endereco VARCHAR(255) NOT NULL,
      observacoes TEXT NULL,
      valor DECIMAL(10,2) DEFAULT 0,
      status VARCHAR(40) DEFAULT 'Agendado',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS historico_atendimentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      agendamento_id INT NULL,
      paciente VARCHAR(120) NOT NULL,
      cuidador VARCHAR(120) NOT NULL,
      data_atendimento DATE NOT NULL,
      horario_inicio TIME NULL,
      horario_fim TIME NULL,
      procedimentos TEXT NOT NULL,
      observacoes TEXT NULL,
      status VARCHAR(40) DEFAULT 'Concluído',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS avaliacoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      atendimento_id INT NULL,
      agendamento_id INT NULL,
      avaliador VARCHAR(120) NOT NULL,
      cuidador VARCHAR(120) NOT NULL,
      nota INT NOT NULL,
      comentario TEXT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS familiares (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NULL,
      nome VARCHAR(120) NOT NULL,
      parentesco VARCHAR(80) NOT NULL,
      email VARCHAR(150) NULL,
      observacoes TEXT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(
    `INSERT INTO usuario
      (usr_name, usr_email, usr_birthday, usr_cpf, usr_estado, usr_cidade,
       usr_rua, usr_cep, usr_numero, usr_complemento, usr_bairro, usr_pwd, tipo_usuario)
     VALUES
      ('Usuário Teste', 'teste@allcare.com', '2000-01-01', '00000000000', 'SP', 'Barueri',
       'Rua Teste', '00000000', '100', 'Casa', 'Casa', '123456', 'contratante')
     ON DUPLICATE KEY UPDATE usr_pwd = VALUES(usr_pwd), tipo_usuario = VALUES(tipo_usuario)`
  );

  await connection.query(`
    INSERT INTO agendamentos (paciente, cuidador, especialidade, data_consulta, horario, endereco, observacoes, valor, status)
    SELECT 'Maria Silva', 'Ana Cuidadora', 'Acompanhamento domiciliar', CURDATE(), '14:00:00', 'Barueri - SP', 'Consulta de demonstração do sistema.', 150.00, 'Agendado'
    WHERE NOT EXISTS (SELECT 1 FROM agendamentos LIMIT 1);
  `);

  await connection.query(`
    INSERT INTO historico_atendimentos (paciente, cuidador, data_atendimento, horario_inicio, horario_fim, procedimentos, observacoes, status)
    SELECT 'Maria Silva', 'Ana Cuidadora', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:00:00', '12:00:00', 'Acompanhamento, medicação conforme orientação e relatório ao familiar.', 'Atendimento concluído sem intercorrências.', 'Concluído'
    WHERE NOT EXISTS (SELECT 1 FROM historico_atendimentos LIMIT 1);
  `);

  await connection.query(`
    INSERT INTO avaliacoes (avaliador, cuidador, nota, comentario)
    SELECT 'Usuário Teste', 'Ana Cuidadora', 5, 'Excelente atendimento e comunicação.'
    WHERE NOT EXISTS (SELECT 1 FROM avaliacoes LIMIT 1);
  `);

  await connection.end();
}

export default pool;
