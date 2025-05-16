// services/spotifyService.js
const axios = require('axios');

async function getSpotifyAccessToken(code, clientId, clientSecret, redirectUri) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');  // Codificação do client_id e client_secret

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      },
      headers: {
        'Authorization': `Basic ${auth}`, // Cabeçalho de autenticação básico
      },
    });

    return response.data;  // Retorna os dados com access_token e refresh_token
  } catch (error) {
    console.error("Erro ao obter access token do Spotify:", error.response ? error.response.data : error.message);
    throw new Error("Erro ao obter access token do Spotify");
  }
}

async function getSpotifyUserData(accessToken) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;  // Retorna os dados do usuário do Spotify
  } catch (error) {
    console.error("Erro ao obter dados do usuário do Spotify:", error.response ? error.response.data : error.message);
    throw new Error("Erro ao obter dados do usuário do Spotify");
  }
}

module.exports = { getSpotifyAccessToken, getSpotifyUserData };
