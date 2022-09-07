/**
 * Nom ...................... : mesModules/gestionsClients/addRevisionProgToHistory.js
 * Rôle ..................... : 
 
Ce module permet d'ajouter une entrée en son début dans la table se trouvant dans le fichier revisions.json représentant l'historique des révisions d'un client.
Si aucun historique n'existe, il est crée.
Si il n'y pas de revisionProg.json (càd une révison entrain d'être réalisé) aucun action n'a lieu.
De plus il modifie la fiche client pour la ppt lastRevision.
Supprime également le fichier revisionProg.

Ce module utilise les modules getCurrentRevision.js et setLastRevision.js

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const addRevisionProgToHistory = require("./addRevisionProgToHistory.js");
addRevisionProgToHistory(id);

 **/

const { clError, path, fs, pathClients } = require("../utilitaires/includes");
const getCurrentRevision = require("./getCurrentRevision");
const getUserInfos = require("./getUserInfos");
const setLastRevision = require("./setLastRevision");

function addRevisionProgToHistory(id) {
  id = id.toString();
  if (!getUserInfos(id))
    return null;

  let currentRevision = getCurrentRevision(id);
  if (!currentRevision)
    return null;

  let revisionsHistory = null;
  try {
    revisionsHistory = fs.readFileSync(path.join(pathClients, id, "revisions.json"))
  } catch (err) {
    clError("addRevisionProgToHistory()", `L'user ${id} n'a pas d'historique de révision, nous allons en crée un`, err.message);
  }


  if (!revisionsHistory) {
    revisionsHistory = JSON.stringify([currentRevision], null, 2);
  } else {
    revisionsHistory = JSON.parse(revisionsHistory);
    revisionsHistory.unshift(currentRevision);
    revisionsHistory = JSON.stringify(revisionsHistory, null, 2);
  }

  try {
    fs.writeFileSync(path.join(pathClients, id, "revisions.json"), revisionsHistory);
  } catch (err) {
    clError("addRevisionProgToHistory()", "Impossible de créer un fichier d'historique des révisions", err.message);
    return null;
  }

  try {
    fs.rmSync(path.join(pathClients, id, "revisionProg.json"));
  } catch(err) {
    clError("addRevisionProgToHistory()", `Impossible de supp la revisionProg.json`, err.message);
  }

  setLastRevision(id);
  console.log("Historque des revisions mis à jour de l'user " + id)

  return true;
}

module.exports = addRevisionProgToHistory;