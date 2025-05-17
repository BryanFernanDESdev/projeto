INSERT INTO tons (tom) VALUES
('C maior'), ('C# maior'), ('Db maior'), ('D maior'), 
('D# maior'), ('Eb maior'), ('E maior'), ('F maior'),
('F# maior'), ('Gb maior'), ('G maior'), ('G# maior'),
('Ab maior'), ('A maior'), ('A# maior'), ('Bb maior'),
('B maior'), ('Cb maior'),

('A menor'), ('A# menor'), ('Bb menor'), ('B menor'),
('C menor'), ('C# menor'), ('D menor'), ('D# menor'),
('Eb menor'), ('E menor'), ('F menor'), ('F# menor'),
('G menor'), ('G# menor'), ('Ab menor'),

('A menor harmônico'), ('A# menor harmônico'), ('Bb menor harmônico'),
('B menor harmônico'), ('C menor harmônico'), ('C# menor harmônico'),
('D menor harmônico'), ('D# menor harmônico'), ('Eb menor harmônico'),
('E menor harmônico'), ('F menor harmônico'), ('F# menor harmônico'),
('G menor harmônico'), ('G# menor harmônico'), ('Ab menor harmônico'),

('A menor melódico'), ('A# menor melódico'), ('Bb menor melódico'),
('B menor melódico'), ('C menor melódico'), ('C# menor melódico'),
('D menor melódico'), ('D# menor melódico'), ('Eb menor melódico'),
('E menor melódico'), ('F menor melódico'), ('F# menor melódico'),
('G menor melódico'), ('G# menor melódico'), ('Ab menor melódico');

SELECT `tons`.`id`,
    `tons`.`tom`
FROM `projeto_entra21`.`tons`;

INSERT INTO artistas (nome, foto_url) VALUES 
('Nirvana', 'https://i.scdn.co/image/84282c28d851a700132356381fcfbadc67ff498b'),
('The Smiths', 'https://i.scdn.co/image/4bf08a9e6eea088b20d4092d1322bbd3f39ff9af');

INSERT INTO albuns (nome, cover_url, lancado_em, artistas_id) VALUES 
('Nevermind', 'https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf', '1991-09-24', 1),
('hatful of Hollow', 'https://images.radiox.co.uk/images/664878?crop=1_1&width=660&format=webp&signature=-P3EXF8jlnof3ua2ZRgX3wdM3hM=', '1984-11-12', 2);

INSERT INTO album_artistas (album_id, artista_id) VALUES 
(1, 1),
(2, 2);

INSERT INTO musicas (numero_faixa, nome, bpm, compasso, duracao, tom_id, album_id) VALUES 
(1, 'Polly', 121, '4/4', 257, 11, 1),
(2, 'Come As You Are', 120, '4/4', 338, 28, 1),
(3, 'Breed', 158, '4/4', 304, 9, 1),
(4, 'In Bloom', 157, '4/4', 415, 12, 1),
(5, 'On a Plain', 133, '4/4', 316, 4, 1),
(6, 'Drain You', 133, '4/4', 343, 16, 1),
(7, 'Lithium', 123, '4/4', 417, 12, 1),
(8, 'Something In The Way', 105, '4/4', 352, 30, 1),
(9, 'Endless, Nameless', 132, '4/4', 642, 12, 1),
(10, 'Back to the old House', 104, '4/4', 306, 4, 2);

INSERT INTO usuarios (email, senha) VALUES 
('123@exemplo.com', SHA2('senha123', 256)),
('321@exemplo.com', SHA2('senha456', 256));

INSERT INTO spotify_user (usuario_id, spotify_user, access_token) VALUES 
(1, '123', 'token123'),
(2, '321', 'token456');

INSERT INTO playlists (nome, usuario_id) VALUES 
('Rock', 1),
('musica clássica', 2);

INSERT INTO playlist_musica (musica_id, playlist_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(1, 2),
(2, 2);


