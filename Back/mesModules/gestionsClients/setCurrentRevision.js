/**
 * Nom ...................... : setCurrentRevision.js
 * Rôle ..................... : 
 
Ce module permet de créer, ou mettre à jours (par écrasement complet) du fichier représentant la revision programmé.
Ce module n'écrit que si l'utilisateur existe (vérification faite par getUserInfos())

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setCurrentRevision = require("./setCurrentRevision");
let data = {
  "25/08/2022, 10:34:49": {
    "vehiculeInfos": {
      "immat": "AANNNAA",
      "km": 15000,
      "libelleStandardise": {
        "marque": "audi",
        "modele": "a1.json",
        "motorisation": "a1 1.5 hDi"
      }
    },
    "aFaire": [
      "changemment de filtre",
      "filtre à air"
    ],
    "etatDesLieux": {
      "pickUp": {
        "status": "noStrat",
        "realiserLe": null,
        "croixRouges": []
      },
      "dropUp": {
        "status": "noStrat",
        "realiserLe": null,
        "croixRouges": []
      }
    },
    "fait": [
      {
        "status": "noStart",
        "intitule": "changemment de filtre",
        "imgs": []
      },
      {
        "status": "noStart",
        "intitule": "filtre à air",
        "imgs": []
      }
    ]
  }
}

setCurrentRevision(id, data);

 **/

const fs = require("fs");
const path = require("path");
const clError = require("../utilitaires/error");
const getUserInfos = require("./getUserInfos");

const pathClients = path.join(__dirname, "../../data/clients");

function setCurrentRevision(id, data) {
  id = id.toString();

  if (!getUserInfos(id))
    return;

  try {
    fs.writeFileSync(path.join(pathClients, id, "revisionProg.json"), JSON.stringify(data, null, 2));
  } catch (err) {
    clError("setRevision()", `impossible d'écrire les revisions pour l'user ${id}`, err.message);

    return null;
  }

  return true;
}

module.exports = setCurrentRevision