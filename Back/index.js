const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

const initCarnetsEntretiensSdd = require(path.join(__dirname, 'mesModules/carnetsEntretiens/initCarnetsEntretiensSdd'));
const carnetsEntretiensSdd = initCarnetsEntretiensSdd();

app.get('/', (_, resp) => {
  resp.send("ok");
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`)
})