const fs = require("fs");
const path = require("path");
const clError = require("../utilitaires/error");

function getAllRevisons(userId) {
  let allRevisions = null;
  try {
    allRevisions = fs.readFileSync(path.join(__dirname, `../../data/clients/${userId}`, "revisions.json"));
  } catch(err) {
    clError("getAllRevision()", "Problème lors de la lecture de l'historique des révisions, peut-être qu'il n'ya pas dhistorique ...", err.message);

    return null;
  }

  return allRevisions.toString();
}

module.exports = getAllRevisons