// routes/spotifyRoutes.js
const express = require('express');
const { getSpotifyAccessToken, getSpotifyUserData } = require('../services/spotifyService');
const { Usuario, SpotifyUser } = require('../models');  // Importando os modelos de usuário e Spotify

const router = express.Router(); // Definindo o router corretamente

// Rota de login
router.get('/login', (req, res) => {
  const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);  // URL de redirecionamento
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-read-private playlist-read-collaborative`;

  console.log('Redirecionando para URL de autenticação:', authUrl);
  res.redirect(authUrl);  // Redireciona para o Spotify
});

// Rota de callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;  // O código de autorização que vem do Spotify

  if (!code) {
    console.log('Código de autorização não encontrado!');
    return res.status(400).send('Código de autorização não encontrado.');
  }

  try {
    console.log('Código de autorização recebido:', code);

    // Tenta obter os tokens do Spotify
    const { access_token, refresh_token, expires_in } = await getSpotifyAccessToken(
      code,
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET,
      process.env.SPOTIFY_REDIRECT_URI
    );

    console.log('Tokens recebidos:', access_token, refresh_token);

    // Pega os dados do usuário
    const userData = await getSpotifyUserData(access_token);
    console.log('Dados do usuário do Spotify:', userData);

    // Verifica se o usuário existe no banco de dados
    const spotifyUserId = userData.id;
    const tokenExpiryTime = new Date(Date.now() + expires_in * 1000);
    const emailFake = `${spotifyUserId}@gmail.com`;  // Gera um email fictício com base no ID do usuário
    const senhaFake = '1234';  // Senha fictícia

    // Verifica se o usuário já existe no banco de dados
    let usuario = await Usuario.findOne({ where: { email: emailFake } });

    if (!usuario) {
      // Se não existir, cria um novo usuário
      usuario = await Usuario.create({ email: emailFake, senha: senhaFake });
    }

    // Insere ou atualiza os dados do Spotify para esse usuário
    await SpotifyUser.upsert({
      usuario_id: usuario.id,
      spotify_user: spotifyUserId,
      access_token: access_token,
      refresh_token: refresh_token,
      token_expires_at: tokenExpiryTime
    });

    console.log('Dados do Spotify armazenados com sucesso!');
    res.send('Autenticação com Spotify concluída!');  // Retorna uma resposta de sucesso
  } catch (error) {
    console.error('Erro na autenticação com o Spotify:', error); // Agora vai mostrar o erro completo
    res.status(500).send(`Erro na autenticação com o Spotify: ${error.message}`);
  }
});

module.exports = router;  // Certifique-se de exportar o router
