import express from 'express';
import dotenv from 'dotenv';
import spotifyRoutes from './routes/spotifyRoutes.js'; // Importação padrão

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/spotify", spotifyRoutes); // Usando as rotas para o Spotify

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
