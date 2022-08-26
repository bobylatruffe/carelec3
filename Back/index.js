const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const PORT = 5000;

// initialiser notre structure de donnée pour les préconisations constructeurs
const { initCarnetsEntretiensSdd } = require("./mesModules/carnetsEntretiens/initCarnetsEntretiensSdd");
initCarnetsEntretiensSdd();

app.get('/', (_, resp) => {
  resp.send("ok");
})

const carnetsEntretiensRoute = require("./routes/carnetsEntretiens/carnetsEntretiens");
app.use("/api/carnetsEntretiens", carnetsEntretiensRoute);

app.get("/*", (_, resp) => { 
  return resp.status(404).send("404");
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`)
})