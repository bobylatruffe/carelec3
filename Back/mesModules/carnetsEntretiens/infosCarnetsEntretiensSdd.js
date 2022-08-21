/**
 * Nom ...................... : infosCarnetsEntretiensSdd.js
 * Rôle ..................... : 
 
Ce module permet d'obtenir les informations contenus dans la sdd initialisé par initCarnetsEntretiens().

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
const getInfos = require('initCarnetsEntretiensSdd');
getInfos.getAllMarquesTab();
getInfosgetAllMotorsFromMarqueTab("Audi");
...

 **/

const initCarnetsEntretiensSdd = require('./initCarnetsEntretiensSdd');
const sdd = initCarnetsEntretiensSdd();

function getAllMarquesTab() {
  let allMarquesTab = [];

  if (allMarquesTab = Object.keys(sdd))
    return allMarquesTab;

  return [];
}

function getAllModelsTab() {
  let allModels = [];
  for (marque of Object.keys(sdd)) {
    allModels.push(Object.keys(sdd[marque]));
  }

  return allModels;
}

function getModelsFromMarqueTab(marque) {
  return Object.keys(sdd[marque]);
}

function getAllMotorsTab() {
  let allMotors = [];
  for (marque of getAllMarquesTab()) {
    for (model of getModelsFromMarqueTab(marque)) {
      for (motor of Object.keys(sdd[marque][model]))
        allMotors.push(motor);
    }
  }

  return allMotors;
}

function getAllMotorsFromMarqueTab(marque) {
  let allMotorsFromMarque = [];
  for (model of getModelsFromMarqueTab(marque)) {
    allMotorsFromMarque.push(Object.keys(sdd[marque][model]));
  }

  return allMotorsFromMarque;
}

function getAllMotorsFromMarqueModelTab(marque, model) {
  let allMotorsFromMarqueModelTab = [];
  for (modelInSdd of getModelsFromMarqueTab(marque)) {
    if (model === modelInSdd)
      return Object.keys(sdd[marque][model])
  }

  return allMotorsFromMarqueModelTab;
}

// attention contrairement aux autres fonctions de ce module,
// cette fonction retourne un objet remplit ou vide si erreur.
function getRevisions(marque, model, motor) {
  let revisions = {};

  try {
    revisions = sdd[marque][model][motor]
  } catch (err) {
    console.error(`Error: getRevisions() : Impossible de trouver les révisions pour ${marque}--${model}--${motor} -> ${err.message}`);
  }

  if (revisions) return revisions;

  return {};
}

console.log(getRevisions("Volvfo", "c30.json", "C30 1.6 100cv"));

module.exports = { getAllMarquesTab, getAllModelsTab, getModelsFromMarqueTab, getAllMotorsFromMarqueTab, getAllMotorsTab, getRevisions, getAllMotorsFromMarqueModelTab };