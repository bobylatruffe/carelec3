/**
 * Nom ...................... : setCurrentRevisionEdl.js
 * Rôle ..................... : 
 
Ce module permet de mettre à jours la propriété "etatDesLieux" d'une révision programmé.

Il a besoin d'un id d'un client, d'une "type" (pickUp || dropUp) et d'un objet sous la forme : 
{
  "status": "enCours",
  "realiserLe": null,
  "croixRouges": []
}

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setCurrentRevisionEdl = require("./setCurrentRevisionEdl");
setCurrentRevisionEdl(148552793, "dropUp", {
  "status": "enCours",
  "realiserLe": null,
  "croixRouges": []
});

 **/

const { clError, path, fs, pathClients } = require("../utilitaires/includes");
const getCurrentRevision = require("./getCurrentRevision");
const setCurrentRevision = require("./setCurrentRevision");
const getUserInfos = require("./getUserInfos");

function setCurrentRevisionEdl(id, type, data) {
  if (!id || type !== "pickUp" && type !== "dropUp" || !data) {
    clError("setCurrentRevisionEdl()", "Aucun ou mauvais id fournit ou type ou data");
    return null;
  }

  if (!getUserInfos(id))
    return null;

  let currentRevision = getCurrentRevision(id);
  if (!currentRevision) return null;

  let currentRevisionDate = Object.keys(currentRevision)[0];
  let currentRevisionEdl = currentRevision[currentRevisionDate].etatDesLieux;

  // Correction du même beug que pour setCurrentRevisionFait,
  // garder les ancienne positions de 'croixRouge'

  currentRevisionEdl[type].croixRouges.forEach(elem => data.croixRouges.push(elem));

  // fin de correction
  // let currentRevisionType = currentRevisionEdl[type]
  currentRevision[currentRevisionDate].etatDesLieux[type] = data;
  if (!setCurrentRevision(id, currentRevision))
    return null;

  console.log("Mise à jour etat des lieux ok")
  return true;
}

module.exports = setCurrentRevisionEdl;

// setCurrentRevisionEdl(148552793, "pickUp", {
//   "status": "start",
//   "realiserLe": null,
//   "croixRouges": [1, 2, 3]
// });

// setCurrentRevisionEdl(148552793, "dropUp", {
//   "status": "end",
//   "realiserLe": null,
//   "croixRouges": []
// });
