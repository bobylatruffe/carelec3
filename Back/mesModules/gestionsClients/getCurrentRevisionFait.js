/**
 * Nom ...................... : getCurrentRevisionFait.js
 * Rôle ..................... : 
 
Ce module permet d'obtenir les tâches déjà réalisé par le garagiste depuis un entretien en cours.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const getCurrentRevisionFait = require("./setCurrentRevisionFait");
getCurrentRevisionFait(148552793);

getCurrentRevisionFait(148552793);

 **/

const { clError, path, fs, pathClients } = require("../utilitaires/includes");
const getCurrentRevision = require("./getCurrentRevision");
const getUserInfos = require("./getUserInfos");

function getCurrentRevisionFait(id) {
  if (!id) {
    clError("setCurrentRevisionFait()", "Aucun id fournit ou data");
    return null;
  }

  if (!getUserInfos(id))
    return null;

  let currentRevision = getCurrentRevision(id);
  if (!currentRevision) return null;

  let currentRevisionDate = Object.keys(currentRevision)[0];

  let currentRevisionFait = currentRevision[currentRevisionDate].fait;

  return currentRevisionFait;
}

module.exports = getCurrentRevisionFait;

// console.log(getCurrentRevisionFait(148552793))