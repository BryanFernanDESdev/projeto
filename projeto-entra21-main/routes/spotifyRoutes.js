const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const { getSpotifyAccessToken, getSpotifyUserData } = require("../services/spotifyService");
const axios = require("axios");

// Rota de login
router.get("/login", (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=playlist-read-private playlist-read-collaborative`;
  res.redirect(authUrl);
});

// Callback do Spotify
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.send("Código de autorização não encontrado.");
  }

  try {
    const { access_token, refresh_token, expires_in } = await getSpotifyAccessToken(
      code,
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET,
      process.env.SPOTIFY_REDIRECT_URI
    );

    const userData = await getSpotifyUserData(access_token);
    const spotifyUserId = userData.id;

    const tokenExpiryTime = new Date(Date.now() + expires_in * 1000);

    const query = `
      INSERT INTO UsuarioSpotify (spotify_user_id, access_token, refresh_token, token_expires_at)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        access_token = VALUES(access_token),
        refresh_token = VALUES(refresh_token),
        token_expires_at = VALUES(token_expires_at)
    `;

    connection.query(query, [spotifyUserId, access_token, refresh_token, tokenExpiryTime], (err, result) => {
      if (err) {
        console.error("Erro ao armazenar tokens no banco:", err);
        return res.status(500).send("Erro ao armazenar tokens");
      }

      // Redireciona para as playlists do usuário
      res.redirect(`/spotify/playlists/${spotifyUserId}`);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro na autenticação com o Spotify");
  }
});

// Rota para exibir playlists
router.get("/playlists/:spotify_user_id", async (req, res) => {
  const { spotify_user_id } = req.params;

  try {
    const query = "SELECT access_token FROM UsuarioSpotify WHERE spotify_user_id = ?";
    connection.query(query, [spotify_user_id], async (err, results) => {
      if (err || results.length === 0) {
        console.error("Erro ao recuperar o token de acesso:", err);
        return res.status(500).send("Erro ao recuperar o token de acesso");
      }

      const access_token = results[0].access_token;

      const playlistsResponse = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      res.json(playlistsResponse.data.items);
    });
  } catch (error) {
    console.error("Erro ao recuperar playlists do Spotify:", error);
    res.status(500).send("Erro ao recuperar playlists");
  }
});

module.exports = router;
