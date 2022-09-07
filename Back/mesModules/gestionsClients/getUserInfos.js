/**
 * Nom ...................... : getUserInfos.js
 * Rôle ..................... : 
 
Ce module permet d'obtenir les informations d'un utilisateur.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const getUserInfos = require("./getUserInfos");
getUserInfos(id) => { nom: "nom", prenom : "...", ...}

 **/ 

const fs = require("fs");
const path = require("path");
const clError = require("../utilitaires/error");

const pathClients = path.join(__dirname, "../../data/clients");

function getUserInfos(id) {
  id = id.toString();
  let userInfos = null;

  try {
    userInfos = fs.readFileSync(path.join(pathClients, id, id + ".json"));
  } catch (err) {
    clError("getUserInfos()", "Impossible de lire le fichier de l'user " + id, err.message);
    return null;
  }

  return JSON.parse(userInfos);
}

module.exports = getUserInfos;