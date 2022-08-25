/**
 * Nom ...................... : getCurrentRevisionEdl.js
 * Rôle ..................... : 
 
Ce module permet d'obtenir la propriété "etatDesLieux" d'une révision en cours.

Il a besoin d'un id d'un client, d'une "type" (pickUp || dropUp) 

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const getCurrentRevisionEdl = require("./setCurrentRevisionEdl");
getCurrentRevisionEdl(148552793, "dropUp");

 **/

const { clError, path, fs, pathClients } = require("../utilitaires/includes");
const getCurrentRevision = require("./getCurrentRevision");
const setCurrentRevision = require("./setCurrentRevision");
const getUserInfos = require("./getUserInfos");

function getCurrentRevisionEdl(id, type) {
  if (!id || type !== "pickUp" && type !== "dropUp") {
    clError("setCurrentRevisionEdl()", "Aucun ou mauvais id fournit ou type");
    return null;
  }

  if (!getUserInfos(id))
    return null;

  let currentRevision = getCurrentRevision(id);
  if (!currentRevision) return null;

  let currentRevisionDate = Object.keys(currentRevision)[0];
  let currentRevisionEdl = currentRevision[currentRevisionDate].etatDesLieux;

  return currentRevisionEdl[type];
}

module.exports = getCurrentRevisionEdl;