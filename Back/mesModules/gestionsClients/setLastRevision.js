/**
 * Nom ...................... : setLastRevision.js
 * Rôle ..................... : 
 
Ce module permet de mettre à jours dans le fichier de l'utilisateur la propriété "lastRevision".
lastRevision représente la dernière révision effectué. Elle est récupéré comme 1er élément du tableau de revisions.json du client.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setLastRevision = require("./setLastRevision");
setLastRevision(id) => true | null;

 **/

const fs = require("fs");
const path = require("path");
const hash = require("../utilitaires/hash");
const clError = require("../utilitaires/error");
const getUserInfos = require("./getUserInfos");
const setUserInfos = require("./setUserInfos");

const pathClients = path.join(__dirname, "../../data/clients");

function setLastRevision(id) {
  let user = null;

  try {
    user = fs.readdirSync(path.join(pathClients, id.toString()));
  } catch (err) {
    clError("setLastRevision()", `L'user ${id} n'existe pas dans la bdd`);
    return null;
  }

  try {
    user = fs.readFileSync(path.join(pathClients, id.toString(), "revisions.json"));
  } catch (err) {
    clError("setLastRevision()", `L'user ${id} n'a réalisé aucune révision`, err.message);
    return null;
  }

  let lastRevision = JSON.parse(user.toString())[0];

  let userInfos = null;
  if (!(userInfos = getUserInfos(id.toString())))
    return null;

  userInfos.lastRevision = lastRevision;
  if (!setUserInfos(id.toString(), userInfos))
    return null;

    console.log(`lastRevision de user ${id} mis à jour.`)
  return true;
}


module.exports = setLastRevision;