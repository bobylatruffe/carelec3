/**
 * Nom ...................... : initCarnetEntretienSdd.js
 * Rôle ..................... : 
 
Ce module permet d'initialiser la structure de donnée qui va contenir toute les préconisations constructeurs disponnible dans le dossier data/carnetsEntretiens

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
 const initSdd = require('initCarnetsEntretiensSdd');
 initSdd()

 **/

const fs = require("fs");
const path = require("path");

const carnetsEntretiensPath = path.join(__dirname, "../../data/carnetsEntretiens/");

let likeSingletonSdd = null;

function getMarques(carnetsEntretiensPath) {
  let marquesDispoTab = null;

  try {
    marquesDispoTab = fs.readdirSync(carnetsEntretiensPath);
  } catch (err) {
    throw new Error(`Error: getMarques() : impossible d'obtenir les marques -> ${err.message}`);
  }

  return marquesDispoTab;
}

function setCarnetsEntretiensSddMaquesModels(marquesDisposTab, carnetsEntretiensSdd) {
  let modelsDispoTab = null;
  for (marque of marquesDisposTab) {
    try {
      modelsDispoTab = fs.readdirSync(path.join(carnetsEntretiensPath, marque));
    } catch (err) {
      throw new Error(`Error: setCarnetsEntretiensModels() : impossible d'obtenir les models -> ${err.message}`);
    }

    carnetsEntretiensSdd[marque] = {};
    modelsDispoTab.forEach(models => {
      carnetsEntretiensSdd[marque][models] = {};
    })
  }
}

function setCarnetsEntretiensSddMotorisationsRevisions(carnetsEntretiensSdd) {
  let motorisations = null;

  for (marque in carnetsEntretiensSdd) {
    for (model in carnetsEntretiensSdd[marque]) {
      try {
        motorisations = fs.readFileSync(
          path.join(carnetsEntretiensPath, marque, model)
        ).toString();
      } catch (err) {
        throw new Error(`Error: setCarnetsEntretiensSddMotorisationsRevisions() : impossible d'obtenir les motorisations -> ${err.message}`);
      }


      try {
        motorisations = JSON.parse(motorisations);
      } catch (err) {
        console.error(`Problème (mais continue sans traitement) : setCarnetsEntretiensSddMotorisationsRevisions() : Problème de 'parsage' en JSON dans le fichier ${marque}/${model} qui sera ignoré.`);
        continue;
      }

      carnetsEntretiensSdd[marque][model] = motorisations;

    }
  }
}

function getCarnetsEntretiensSdd() {
  if (likeSingletonSdd)
    return likeSingletonSdd;
}

function initCarnetsEntretiensSdd() {
  let marquesDispoTab = null;
  try {
    marquesDispoTab = getMarques(carnetsEntretiensPath);
  } catch (err) {
    console.log(err.message);
    return null;
  }

  const carnetsEntretiensSdd = {};
  try {
    setCarnetsEntretiensSddMaquesModels(marquesDispoTab, carnetsEntretiensSdd);
  } catch (err) {
    console.log(err.message);
    return null;
  }

  try {
    setCarnetsEntretiensSddMotorisationsRevisions(carnetsEntretiensSdd);
  } catch (err) {
    console.log(err.message);
    return null;
  }

  likeSingletonSdd = carnetsEntretiensSdd;
  return carnetsEntretiensSdd;
}

// initCarnetsEntretiensSdd();

module.exports = { initCarnetsEntretiensSdd, getCarnetsEntretiensSdd }