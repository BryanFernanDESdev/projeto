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


