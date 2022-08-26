/**
 * Nom ...................... : initCarnetEntretienSdd.test.js
 * Rôle ..................... : 
 
Permet de tester que l'initiation de la sdd produite par initCarnetsEntretiens() contient toutes les marques et modèles de véhicule dans celle-ci depuis le dossier data/carnetsEntretiens.

Ce fichier de test doit être complété !

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
 $ jest

 **/

const {initCarnetsEntretiensSdd} = require('./initCarnetsEntretiensSdd');
const fs = require("fs");
const path = require("path");

let sdd = null;
let marques = null;
let models = []
let pathSdd = path.join(__dirname, "../../data/carnetsEntretiens");
beforeAll(() => {
  sdd = initCarnetsEntretiensSdd();
  marques = fs.readdirSync(pathSdd);
  for(marque of marques) {
    models.push(fs.readdirSync(pathSdd + "/" + marque));
  }
})

afterAll(()=> {
  sdd = null;
  marques = null;
  models = null;
  pathSdd = null;
})

describe("Vérification de l'intégrité de la SDD", () => {
  test("Les marques sont-elles toutes présentes dans la SDD ?", () => {
    // for (marque of marques) {
    expect(Object.keys(sdd)).toEqual(marques);
    // }
  })

  test("Les modèles sont-elles toutes présentes dans la SDD ?", () => {
    let marquesSdd = Object.keys(sdd);
    let i = 0;
    for (marqueSdd of marquesSdd) {
      expect(Object.keys(sdd[marqueSdd])).toEqual(models[i])
      i++;
    }
  })
})

