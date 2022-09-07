/**
 * Nom ...................... : setUserInfos.js
 * Rôle ..................... : 
 
Ce module permet de "mettre à jours" des informations d'un client.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setUserInfos = require("./setUserInfos");
setUserInfos(id, {...})

 **/

const fs = require("fs");
const path = require("path");
const clError = require("../utilitaires/error");

const pathClients = path.join(__dirname, "../../data/clients");

function setUserInfos(id, data) {
  let userInfos = null;

  try {
    userInfos = fs.writeFileSync(path.join(pathClients, id, id+".json"), JSON.stringify(data, null, 2));
  } catch (err) {
    clError("getUserInfos()", "Impossible d'écrire dans  le fichier de l'user " + id, err.message);
    return null;
  }

  console.log(`Utilisateur ${id} mis à jour.`)
  return true;
}

module.exports = setUserInfos;