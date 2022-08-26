const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 5000;

// initialiser notre structure de donnée pour les préconisations constructeurs
const { initCarnetsEntretiensSdd } = require("./mesModules/carnetsEntretiens/initCarnetsEntretiensSdd");
initCarnetsEntretiensSdd();

app.get('/', (req, resp) => {
  resp.send("ok");
})

const carnetsEntretiensRoute = require("./routes/carnetsEntretiens/carnetsEntretiens");
app.use("/api/carnetsEntretiens", carnetsEntretiensRoute);

const toStandardiserRoute = require("./routes/toStandardiser/toStandardiser");
app.use("/api/toStandardiser", toStandardiserRoute);

const admin = require("./routes/admin/admin");
app.use("/api/admin", admin);

const user = require("./routes/user/user");
app.use("/api/user", user);

app.get("/*", (_, resp) => {
  return resp.status(404).json({message: "rien à voir ici..."});
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`)
})