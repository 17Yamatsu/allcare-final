CREATE DATABASE IF NOT EXISTS allcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE allcare;

CREATE TABLE IF NOT EXISTS usuario (
  usr_id INT AUTO_INCREMENT PRIMARY KEY,
  usr_name VARCHAR(120) NOT NULL,
  usr_email VARCHAR(150) NOT NULL UNIQUE,
  usr_birthday DATE NULL,
  usr_cpf VARCHAR(20) NULL,
  usr_estado VARCHAR(2) NULL,
  usr_cidade VARCHAR(120) NULL,
  usr_rua VARCHAR(200) NULL,
  usr_bairro VARCHAR(200) NULL,
  usr_cep VARCHAR(20) NULL,
  usr_numero VARCHAR(20) NULL,
  usr_complemento VARCHAR(50) DEFAULT 'Casa',
  usr_pwd VARCHAR(100) NOT NULL,
  usr_photo MEDIUMBLOB NULL,
  tipo_usuario VARCHAR(40) DEFAULT 'contratante',
  -- telefone VARCHAR(30) NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mensagens_chat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  autor VARCHAR(50) NOT NULL,
  mensagem TEXT NOT NULL,
  valor_negociado DECIMAL(10,2) NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS chat_negociacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  autor VARCHAR(50) NOT NULL,
  mensagem TEXT NOT NULL,
  valor_negociado DECIMAL(10,2) NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE IF NOT EXISTS familiares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  nome VARCHAR(120) NOT NULL,
  parentesco VARCHAR(80) NOT NULL,
  telefone VARCHAR(30) NULL,
  email VARCHAR(150) NULL,
  observacoes TEXT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO usuario
  (usr_name, usr_email, usr_birthday, usr_cpf, usr_estado,
   usr_cidade, usr_rua, usr_cep, usr_numero,
   usr_complemento, usr_bairro, usr_pwd, tipo_usuario)
VALUES
  ('Usuário Teste', 'teste@allcare.com', '2000-01-01', '00000000000', 'SP',
   'Barueri', 'Rua Teste', '00000000', '100', 'Casa', 'Casa', '123456', 'contratante')
ON DUPLICATE KEY UPDATE usr_pwd = VALUES(usr_pwd), tipo_usuario = VALUES(tipo_usuario);

select * from usuario;