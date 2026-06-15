CREATE TABLE `usuario` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_mail` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_birthday` date NOT NULL,
  `usr_cpf` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_address` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_cep` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_type` enum('Paciente','Usuário') COLLATE utf8mb4_unicode_ci DEFAULT 'Usuário',
  `usr_pwd` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_photo` mediumblob,
  `usr_medicalinfo` varchar(700) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_usuario` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT 'contratante',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `paciente` (
  `pac_id` int NOT NULL AUTO_INCREMENT,
  `pac_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pac_address` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pac_cpf` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pac_birthday` date NOT NULL,
  `pac_medicalinfo` varchar(700) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pac_usr` (
  `FK_usr` int NOT NULL,
  `FK_pac` int NOT NULL,
  PRIMARY KEY (`FK_usr`,`FK_pac`),
  KEY `FK_pac` (`FK_pac`),
  CONSTRAINT `pac_usr_ibfk_1`
    FOREIGN KEY (`FK_usr`) REFERENCES `usuario` (`usr_id`),
  CONSTRAINT `pac_usr_ibfk_2`
    FOREIGN KEY (`FK_pac`) REFERENCES `paciente` (`pac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `mensagens_chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor_negociado` decimal(10,2) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `historico_atendimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agendamento_id` int DEFAULT NULL,
  `paciente` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cuidador` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atendimento` date NOT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL,
  `procedimentos` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT 'Concluído',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `familiares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `nome` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentesco` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `atendimento_id` int DEFAULT NULL,
  `agendamento_id` int DEFAULT NULL,
  `avaliador` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cuidador` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nota` int NOT NULL,
  `comentario` text COLLATE utf8mb4_unicode_ci,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `chat_negociacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor_negociado` decimal(10,2) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;