const axios = require("axios");

const getSpotifyAccessToken = async (code, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI) => {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      params: {
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter token do Spotify: ${error.message}`);
  }
};

const getSpotifyUserData = async (accessToken) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter dados do usuário do Spotify: ${error.message}`);
  }
};

module.exports = {
  getSpotifyAccessToken,
  getSpotifyUserData
};