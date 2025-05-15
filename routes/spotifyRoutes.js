const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const { getSpotifyAccessToken, getSpotifyUserData } = require("../services/spotifyService");

router.get("/login", (req, res) => {
  const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-read-private playlist-read-collaborative`;
  console.log("Redirecionando para URL de autenticação:", authUrl);
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log("Código de autorização recebido:", code); // Verifica o código de autorização

  if (!code) {
    console.log("Código de autorização não encontrado!");
    return res.status(400).send("Código de autorização não encontrado.");
  }

  try {
    // Tenta obter o token do Spotify
    console.log("Tentando obter o token do Spotify...");
    const { access_token, refresh_token, expires_in } = await getSpotifyAccessToken(
      code,
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET,
      process.env.SPOTIFY_REDIRECT_URI
    );
    console.log("Tokens recebidos:", access_token, refresh_token); // Verifica os tokens recebidos

    // Obtém dados do usuário do Spotify
    const userData = await getSpotifyUserData(access_token);
    console.log("Dados do usuário do Spotify:", userData); // Verifica os dados do usuário

    const spotifyUserId = userData.id;
    const tokenExpiryTime = new Date(Date.now() + expires_in * 1000);

    // Email fake para o teste (pode ser modificado futuramente)
    const emailFake = `${spotifyUserId}@gmail.com`;
    const senhaFake = "1234";

    // 1. Verifica se o usuário já existe na base de dados
    const checkUserQuery = `SELECT id FROM usuarios WHERE email = ?`;
    connection.query(checkUserQuery, [emailFake], (err, results) => {
      if (err) {
        console.error("Erro ao verificar usuário:", err);
        return res.status(500).send("Erro interno ao verificar o usuário.");
      }

      if (results.length === 0) {
        // 2. Cria o usuário na base de dados
        console.log("Usuário não encontrado, criando novo usuário...");
        const insertUserQuery = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
        connection.query(insertUserQuery, [emailFake, senhaFake], (err, result) => {
          if (err) {
            console.error("Erro ao criar usuário:", err);
            return res.status(500).send("Erro ao criar usuário.");
          }
          const usuarioId = result.insertId;
          salvarSpotifyUser(usuarioId);
        });
      } else {
        const usuarioId = results[0].id;
        console.log("Usuário encontrado, salvando dados do Spotify...");
        salvarSpotifyUser(usuarioId);
      }

      function salvarSpotifyUser(usuarioId) {
        console.log("Salvando dados do Spotify para o usuário:", usuarioId); // Verifica o usuário sendo salvo
        const insertSpotifyUserQuery = `
          INSERT INTO spotify_user (usuario_id, spotify_user, access_token, refresh_token, token_expires_at)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            spotify_user = VALUES(spotify_user),
            access_token = VALUES(access_token),
            refresh_token = VALUES(refresh_token),
            token_expires_at = VALUES(token_expires_at)
        `;

        connection.query(
          insertSpotifyUserQuery,
          [usuarioId, spotifyUserId, access_token, refresh_token, tokenExpiryTime],
          (err, result) => {
            if (err) {
              console.error("Erro ao armazenar tokens no banco:", err);
              return res.status(500).send("Erro ao armazenar tokens.");
            }
            console.log("Dados do Spotify armazenados com sucesso!"); // Verifica se os dados foram salvos
            res.send("Autenticação com Spotify concluída!");
          }
        );
      }
    });
  } catch (error) {
    console.error("Erro no callback:", error.message);
    res.status(500).send("Erro na autenticação com o Spotify.");
  }
});

export default router;
