const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (_, resp) => {
  resp.send("ok");
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`)
})