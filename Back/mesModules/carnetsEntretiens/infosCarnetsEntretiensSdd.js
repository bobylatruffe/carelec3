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

// const initCarnetsEntretiensSdd = require('./initCarnetsEntretiensSdd');
// const sdd = initCarnetsEntretiensSdd();

function getAllMarquesTab(sdd) {
  let allMarquesTab = [];

  if (allMarquesTab = Object.keys(sdd))
    return allMarquesTab;

  return [];
}

// attention c'est un tableau de tableau !
function getAllModelsTab(sdd) {
  let allModels = [];
  for (marque of Object.keys(sdd)) {
    allModels.push(Object.keys(sdd[marque]));
  }

  return allModels;
}

function getModelsFromMarqueTab(sdd, marque) {
  let allModelsFromMarqueTab = sdd[marque];
  if (allModelsFromMarqueTab) {
    return Object.keys(sdd[marque]);
  }
  return [];
}

function getAllMotorsTab(sdd) {
  let allMotors = [];
  for (marque of getAllMarquesTab(sdd)) {
    for (model of getModelsFromMarqueTab(sdd, marque)) {
      for (motor of Object.keys(sdd[marque][model]))
        allMotors.push(motor);
    }
  }

  return allMotors;
}

function getAllMotorsFromMarqueTab(sdd, marque) {
  let allMotorsFromMarque = [];
  for (model of getModelsFromMarqueTab(sdd, marque)) {
    allMotorsFromMarque.push(Object.keys(sdd[marque][model]));
  }

  return allMotorsFromMarque;
}

function getAllMotorsFromMarqueModelTab(sdd, marque, model) {
  let allMotorsFromMarqueModelTab = [];
  for (modelInSdd of getModelsFromMarqueTab(sdd, marque)) {
    if (model === modelInSdd)
      return Object.keys(sdd[marque][model])
  }

  return allMotorsFromMarqueModelTab;
}

// attention contrairement aux autres fonctions de ce module,
// cette fonction retourne un objet remplit ou vide si erreur.
function getRevisions(sdd, {marque, model, motor}) {
  let revisions = {};

  try {
    revisions = sdd[marque][model][motor]
  } catch (err) {
    console.error(`Error: getRevisions() : Impossible de trouver les révisions pour ${marque}--${model}--${motor} -> ${err.message}`);
  }

  if (revisions) return revisions;

  return {};
}

module.exports = { getAllMarquesTab, getAllModelsTab, getModelsFromMarqueTab, getAllMotorsFromMarqueTab, getAllMotorsTab, getRevisions, getAllMotorsFromMarqueModelTab };