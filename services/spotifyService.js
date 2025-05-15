import axios from 'axios';

const getSpotifyAccessToken = async (code, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI) => {
  try {
    console.log("Solicitando token do Spotify com o código:", code); // Log para verificar se o código está correto
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
    console.log("Resposta da API do Spotify:", response.data); // Log para verificar a resposta da API
    return response.data;
  } catch (error) {
    console.error("Erro ao obter token do Spotify:", error.message);
    throw new Error(`Erro ao obter token do Spotify: ${error.message}`);
  }
};

const getSpotifyUserData = async (accessToken) => {
  try {
    console.log("Solicitando dados do usuário Spotify com o token:", accessToken); // Log para verificar o token
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Resposta da API do Spotify para dados do usuário:", response.data); // Log para verificar a resposta
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário do Spotify:", error.message);
    throw new Error(`Erro ao obter dados do usuário do Spotify: ${error.message}`);
  }
};

export { getSpotifyAccessToken, getSpotifyUserData }; // Exportação nomeada
