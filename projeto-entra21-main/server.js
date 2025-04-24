require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

// Conectar ao banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco');
});

// Criando a aplicação Express
const app = express();
const port = process.env.PORT || 3000;

// Definindo as variáveis do Spotify
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'https://localhost:3000/callback';
const SPOTIFY_SCOPE = 'playlist-read-private playlist-read-collaborative'; // Permissões necessárias para acessar playlists

// Rota para login no Spotify (autenticação)
app.get('/login', (req, res) => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${SPOTIFY_SCOPE}`;
    res.redirect(authUrl);
});

// Rota para o callback do Spotify (onde o código de autorização será enviado)
app.get('/callback', (req, res) => {
    const code = req.query.code;  // O código de autorização retornado pelo Spotify

    if (!code) {
        console.error('Código de autorização não encontrado na URL!');
        return res.send('Erro na autenticação: código não encontrado');
    }

    console.log('Código de autorização recebido:', code);

    // Solicitar o token de acesso ao Spotify
    axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET,
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const tokenExpiryTime = new Date(Date.now() + response.data.expires_in * 1000);

        console.log('Token de acesso:', accessToken);

        // Obter o spotify_user_id (ID do usuário Spotify)
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(userResponse => {
            const spotifyUserId = userResponse.data.id;

            // Salvar ou atualizar tokens no banco de dados
            const query = `
                INSERT INTO UsuarioSpotify (spotify_user_id, access_token, refresh_token, token_expires_at)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                access_token = VALUES(access_token),
                refresh_token = VALUES(refresh_token),
                token_expires_at = VALUES(token_expires_at)
            `;

            connection.query(query, [spotifyUserId, accessToken, refreshToken, tokenExpiryTime], (err, result) => {
                if (err) {
                    console.error('Erro ao armazenar tokens no banco de dados:', err);
                    return res.status(500).send(`Erro ao armazenar tokens: ${err.message}`);
                }

                console.log('Tokens armazenados com sucesso:', result);
                res.send('Autenticação bem-sucedida!');
            });
        })
        .catch(userError => {
            console.error('Erro ao obter informações do usuário:', userError);
            res.status(500).send('Erro ao obter informações do usuário');
        });

    })
    .catch(error => {
        // Aqui você pode ver a resposta completa de erro para depurar
        if (error.response) {
            console.error('Erro da resposta do Spotify:', error.response.data);
            return res.send(`Erro na autenticação: ${error.response.data.error_description}`);
        }
        console.error('Erro na requisição para o Spotify:', error);
        res.send('Erro na autenticação');
    });
});

// Criando o servidor HTTP
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/playlist', (req, res) => {
    const query = 'SELECT * FROM UsuarioSpotify';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).send('Erro ao buscar usuários');
        }

        // Para cada usuário, buscar as playlists
        const playlistsPromises = results.map(user => {
            return new Promise((resolve, reject) => {
                const spotifyApi = new SpotifyWebApi({
                    accessToken: user.access_token, // Usando o token de acesso do usuário
                });

                // Usar a API do Spotify para pegar as playlists do usuário
                spotifyApi.getUserPlaylists(user.spotify_user_id)
                    .then(data => {
                        resolve({
                            userId: user.id_usuario,
                            playlists: data.body.items.map(playlist => ({
                                name: playlist.name,
                                id: playlist.id,
                            }))
                        });
                    })
                    .catch(err => {
                        reject({
                            userId: user.id_usuario,
                            error: 'Erro ao buscar playlists: ' + err.message,
                        });
                    });
            });
        });

        // Aguardar todas as promessas de playlists
        Promise.all(playlistsPromises)
            .then(playlistsData => {
                res.json(playlistsData);
            })
            .catch(error => {
                res.status(500).json({
                    error: 'Erro ao buscar playlists de alguns usuários',
                    details: error,
                });
            });
    });
});


app.get('/', (req, res) => {
    res.send('Funcionando');
});