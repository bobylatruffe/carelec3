/**
 * Nom ...................... : initRevision.js
 * Rôle ..................... : 
 
Ce module permet d'initialiser un fichier revisionProg.json dans la racine de l'utilisateur.
Ce fichier représente un entretien programmé.
Ce fichier sera également modifier par le garagiste afin de fournir un suivie d'avancement en live à l'user.
L'écriture dans le dossier de l'user ne se réalise seulement s'il existe un repertoire avec l'id de l'user 
et le fichier representant l'user clients/id/id.json.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

const setCurrentRevision = require("./setCurrentRevision");
const initRevision = require("./initRevision");
initRevision({
  id: "idUser",
  dateRevision: "dateDeInterventation",
  vehiculeInfos : {
    "immat": "AANNNAAA",
    "km": 15000,
    "libelleStandardise": {
      "marque": "audi",
      "modele": "a1.json",
      "motorisation": "a1 1.5 hDi"
    },
  },
  revisionsAFaire: ["filtre à air", "bougie", ...]
})

 **/

const fs = require("fs");
const path = require("path");
const setCurrentRevision = require("./setCurrentRevision");

function initRevision({ id, dateRevision, vehiculeInfos, revisionsAFaire }) {
  let revisionProg = {
    [dateRevision]: {},
  };

  let currentRevision = revisionProg[dateRevision];

  currentRevision.vehiculeInfos = vehiculeInfos;
  currentRevision.aFaire = revisionsAFaire;
  currentRevision.etatDesLieux = {
    pickUp: {
      status: "noStrat",
      realiserLe: null,
      croixRouges: [],
    },
    dropUp: {
      status: "noStrat",
      realiserLe: null,
      croixRouges: [],
    }
  }

  let revisionsFait = []
  revisionsAFaire.forEach(elem => {
    revisionsFait.push({
      status: "noStart",
      intitule: elem,
      realiserLe: null,
      imgs: [],
    })
  })

  currentRevision.fait = revisionsFait;

  if (!setCurrentRevision(id, revisionProg))
    return null;

  console.log(`Révision programmé pour l'user ${id}`);
  return true;
}

module.exports = initRevision;