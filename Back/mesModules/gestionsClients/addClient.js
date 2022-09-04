/**
 * Nom ...................... : addClient.js
 * Rôle ..................... : 
 
Ce module permet d'ajouter un client dans le dossier data/clients si l'utilisateur n'existe pas déjà : 
  - un user existe s'il il possède des champs emails et portable identique au client qu'on souhaite ajouter.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
const addClients = require("./addClients")
addClient({
  nom: "bozlak",
  prenom: "fatih",
  dateOfBirth: "05081992",
  addrPost: "16 rue de macon",
  ville: "Strasbourg",
  email: "bozlak.fatih@gmail.com",
  portable: "0636679200",
  vehicule: {
    immat: "AANNNAA",
    km: 15000,
    libelleStandardise: {
      marque: "audi",
      modele: "a1",
      motorisation: "a1 1.5 ..."
    }
  },
  revisionProgramme: null,
  lastRevision: null,
});
 **/

const fs = require("fs");
const path = require("path");
const clError = require("../utilitaires/error");

const pathClients = path.join(__dirname, "../../data/clients");

function checkIfExist(id) {
  let users = null;

  try {
    users = fs.readdirSync(pathClients);
  } catch (err) {
    clError(`checkIfExist()`, `impossible de lire le répertoire des users`, err.message);
    return null;
  }

  if (users.length === 0)
    return true;

  for (user of users) {
    if (user === id) {
      clError('checkIfExist()', `l'utilisatuer existe déjà`);
      return null;
    }
  }

  return true;
}

function addClient(userInfos) {
  for (info in userInfos) {
    if (info === "revisionProgramme" || info === "lastRevision") // il peut juste avoir crée un compte et pas encore eu de révision
      continue;
  }

  let { email, portable } = userInfos;

  let id = (function (str) {
    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash);
  })(`${portable}${email}`).toString();

  if (!checkIfExist(id))
    return null;

  let data = JSON.stringify(userInfos, null, 4);

  try {
    fs.mkdirSync(path.join(pathClients, id));
    fs.writeFileSync(path.join(pathClients, id, id + ".json"), data);
  } catch (err) {
    clError("addClient", "Impossible de créer un nouvelle user", err.message);
    return null;
  }

  console.log("Utilisateur ajouté");

  return id;
}

module.exports = addClient;