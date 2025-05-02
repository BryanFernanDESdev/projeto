const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const {
  getSpotifyAccessToken,
  getSpotifyUserData,
} = require("../services/spotifyService");

router.get("/login", (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=playlist-read-private playlist-read-collaborative`;
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send("Código de autorização não encontrado.");

  try {
    const { access_token, refresh_token, expires_in } =
      await getSpotifyAccessToken(
        code,
        process.env.SPOTIFY_CLIENT_ID,
        process.env.SPOTIFY_CLIENT_SECRET,
        process.env.SPOTIFY_REDIRECT_URI
      );

    const userData = await getSpotifyUserData(access_token);
    const spotifyUserId = userData.id;
    const tokenExpiryTime = new Date(Date.now() + expires_in * 1000);

    // EMAIL FAKE PROVISÓRIO (poderia vir de sessão ou login no futuro)
    const emailFake = `${spotifyUserId}@spotify.com`;
    const senhaFake = "senhaqualquer";

    // 1. Verifica se o usuário já existe
    const checkUserQuery = `SELECT id FROM usuarios WHERE email = ?`;
    connection.query(checkUserQuery, [emailFake], (err, results) => {
      if (err) {
        console.error("Erro ao verificar usuário:", err);
        return res.status(500).send("Erro interno");
      }

      if (results.length === 0) {
        // 2. Cria o usuário
        const insertUserQuery = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
        connection.query(insertUserQuery, [emailFake, senhaFake], (err, result) => {
          if (err) {
            console.error("Erro ao criar usuário:", err);
            return res.status(500).send("Erro ao criar usuário");
          }
          const usuarioId = result.insertId;
          salvarSpotifyUser(usuarioId);
        });
      } else {
        const usuarioId = results[0].id;
        salvarSpotifyUser(usuarioId);
      }

      function salvarSpotifyUser(usuarioId) {
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
              return res.status(500).send("Erro ao armazenar tokens");
            }
            res.send("Autenticação com Spotify concluída!");
          }
        );
      }
    });
  } catch (error) {
    console.error("Erro no callback:", error.message);
    res.status(500).send("Erro na autenticação com o Spotify");
  }
});

module.exports = router;
