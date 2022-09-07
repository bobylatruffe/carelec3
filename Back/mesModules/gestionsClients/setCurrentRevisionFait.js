/**
 * Nom ...................... : setCurrentRevisionFait.js
 * Rôle ..................... : 
 
Ce module (fonction) permet de modifier dans l'entretien programmé (ou en cours) d'un client, càd les tâches que le garagiste est entrain ou à déjà été réalisé.

Il a besoin d'un id d'un client, et d'un objet sous la forme : 
{
  "status": "enCours",
  "intitule": "filtre à air",
  "realiserLe": "25/10/33, 08h30",
  "imgs": ["filtre a air.png"]
}

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setCurrentRevisionFait = require("./setCurrentRevisionFait");
setCurrentRevisionFait(148552793, {
  "status": "enCours",
  "intitule": "filtre à air",
  "realiserLe": "25/10/33, 08h30",
  "imgs": ["filtre a air.png"]
});

setCurrentRevisionFait(148552793, {
  "status": "end",
  "intitule": "filtre à air",
  "realiserLe": "25/10/33, 09h30",
  "imgs": ["filtre a air.png", "filtre a air après.png"]
});

 **/

const { clError, path, fs, pathClients } = require("../utilitaires/includes");
const getCurrentRevision = require("./getCurrentRevision");
const setCurrentRevision = require("./setCurrentRevision");
const getUserInfos = require("./getUserInfos");

function setCurrentRevisionFait(id, aEteFait) {
  if (!id || !aEteFait) {
    clError("setCurrentRevisionFait()", "Aucun id fournit ou data");
    return null;
  }

  if (!getUserInfos(id))
    return null;

  let currentRevision = getCurrentRevision(id);
  if (!currentRevision) return null;

  let currentRevisionDate = Object.keys(currentRevision)[0];


  let currentRevisionFait = currentRevision[currentRevisionDate].fait;

  // correction d'un beug que je n'avais pas anticiper
  // faut que je garde les anciennes images !
  let oldFait = currentRevisionFait.filter(elem => {
    if (elem.intitule === aEteFait.intitule)
      return elem;
  })[0]

  oldFait.imgs.forEach(img => {
    aEteFait.imgs.push(img);
  })
  // fin de la correction

  currentRevisionFait = currentRevisionFait.filter(elem => {
    if (elem.intitule !== aEteFait.intitule)
      return elem;
  })

  currentRevisionFait.unshift(aEteFait);

  currentRevision[currentRevisionDate].fait = currentRevisionFait;
  if (!setCurrentRevision(id, currentRevision))
    return null;

  console.log("Mise à jour aFaire ok");
  return true;
}

module.exports = setCurrentRevisionFait;

// setCurrentRevisionFait(148552793, {
//   "status": "enCours",
//   "intitule": "bougie",
//   "realiserLe": "25/10/33, 08h30",
//   "imgs": ["filtre a air.png"]
// });

// setCurrentRevisionFait(148552793, {
//   "status": "end",
//   "intitule": "filtre à air",
//   "realiserLe": "25/10/33, 09h30",
//   "imgs": ["filtre a air.png", "filtre a air après.png"]
// });