const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const spotifyRoutes = require("./routes/spotifyRoutes");

// Corrigido: adiciona o prefixo /spotify
app.use("/spotify", spotifyRoutes);

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
