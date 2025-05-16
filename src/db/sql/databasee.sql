/*
  Este arquivo de configuração de banco de dados foi estruturado para seguir o padrão adotado pelo Sequelize,
  que utiliza automaticamente as colunas `createdAt` e `updatedAt` para controle de timestamps.

  Motivações:
  - Facilitar o uso das funcionalidades nativas do Sequelize relacionadas a timestamps.
  - Garantir compatibilidade com migrations e sincronização automática das tabelas.
  - Evitar problemas causados por colunas de data com nomes diferentes, como `criado_em`.
  - Manter um padrão consistente entre o banco de dados e os modelos da aplicação, facilitando a manutenção e colaboração entre desenvolvedores.

  Caso queira usar nomes de colunas diferentes ou desativar os timestamps automáticos, é possível ajustar a configuração dos modelos conforme a documentação do Sequelize.
*/








CREATE DATABASE projeto_entra21;
USE projeto_entra21;

CREATE TABLE `musicas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `numero_faixa` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `bpm` int NOT NULL,
  `compasso` varchar(10) NOT NULL DEFAULT '4/4',
  `duracao` int NOT NULL,
  `cifra` longtext,
  `tom_id` int NOT NULL,
  `album_id` int NOT NULL
);

CREATE TABLE `tons` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `tom` varchar(20) UNIQUE NOT NULL
);

CREATE TABLE `playlist_musica` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `musica_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `adicionado_em` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `playlists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `usuario_id` int NOT NULL
);

CREATE TABLE `albuns` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cover_url` varchar(255),
  `lancado_em` date NOT NULL,
  `artistas_id` int NOT NULL
);

CREATE TABLE `album_artistas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `artista_id` int NOT NULL
);

CREATE TABLE `artistas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `foto_url` varchar(255)
);

CREATE TABLE `usuarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `spotify_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` int UNIQUE NOT NULL,
  `spotify_user` varchar(255) UNIQUE,
  `access_token` varchar(255) UNIQUE,
  `refresh_token` varchar(255) UNIQUE,
  `token_expires_at` datetime,
  `criado_em` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `playlist_musica` ADD FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

ALTER TABLE `playlists` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

ALTER TABLE `playlist_musica` ADD FOREIGN KEY (`musica_id`) REFERENCES `musicas` (`id`);

ALTER TABLE `musicas` ADD FOREIGN KEY (`tom_id`) REFERENCES `tons` (`id`);

ALTER TABLE `musicas` ADD FOREIGN KEY (`album_id`) REFERENCES `albuns` (`id`);

ALTER TABLE `spotify_user` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

ALTER TABLE `album_artistas` ADD FOREIGN KEY (`artista_id`) REFERENCES `artistas` (`id`);

ALTER TABLE `album_artistas` ADD FOREIGN KEY (`album_id`) REFERENCES `albuns` (`id`);
show tables;
select * from sequelizemeta;
select * from usuarios;
ALTER TABLE usuarios CHANGE COLUMN criado_em createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE usuarios ADD COLUMN updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
