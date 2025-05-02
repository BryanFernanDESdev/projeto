CREATE VIEW view_playlists_usuarios AS
SELECT 
    u.id AS usuario_id, 
    u.email, 
    p.id AS playlist_id, 
    p.nome AS playlist_nome, 
    p.data_criacao
FROM usuarios u
INNER JOIN playlists p ON u.id = p.usuario_id;

CREATE VIEW view_musicas_playlists_completas AS
SELECT 
    pm.playlist_id,
    m.id AS musica_id,
    m.nome AS musica_nome,
    m.bpm,
    m.compasso,
    m.duracao,
    alb.id AS album_id,
    alb.nome AS album_nome,
    GROUP_CONCAT(DISTINCT art.nome SEPARATOR ', ') AS artistas
FROM playlist_musica pm
INNER JOIN musicas m ON pm.musica_id = m.id
INNER JOIN albuns alb ON m.album_id = alb.id
INNER JOIN album_artistas aa ON alb.id = aa.album_id
INNER JOIN artistas art ON aa.artista_id = art.id
GROUP BY pm.playlist_id, m.id, alb.id;
        
CREATE VIEW view_albuns_artistas AS
    SELECT 
        alb.id AS album_id,
        alb.nome AS album_nome,
        alb.cover_url,
        alb.lancado_em,
        GROUP_CONCAT(DISTINCT art.nome
            SEPARATOR ', ') AS artistas,
        GROUP_CONCAT(DISTINCT art.foto_url
            SEPARATOR ', ') AS fotos_artistas
    FROM
        albuns alb
            INNER JOIN
        album_artistas aa ON alb.id = aa.album_id
            INNER JOIN
        artistas art ON aa.artista_id = art.id
    GROUP BY alb.id;
    
CREATE VIEW view_usuarios_spotify AS
SELECT 
    u.id AS usuario_id,
    u.email,
    u.criado_em AS data_cadastro,
    su.spotify_user,
    su.access_token,
    su.refresh_token,
    su.token_expires_at,
    su.criado_em AS spotify_vinculado_em
FROM usuarios u
LEFT JOIN spotify_user su ON u.id = su.usuario_id;



