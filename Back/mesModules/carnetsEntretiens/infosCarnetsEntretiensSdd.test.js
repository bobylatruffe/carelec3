/**
 * Nom ...................... : initCarnetEntretienSdd.test.js
 * Rôle ..................... : 
 
Permet de tester les fonctions du module infosCarnetsEntretiens fonctionne correctement.

Ce fichier de test doit être complété !

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
 $ jest

 **/

const initCarnetsEntretiensSdd = require("./initCarnetsEntretiensSdd");
const getInfos = require("./infosCarnetsEntretiensSdd");
const externalExec = require('child_process');
const path = require("path");

const pathData = path.join(__dirname, "../../data/carnetsEntretiens/");
let sdd = {};
let marquesFs = [];
let modelesFs = null;
let modelesParMarquesFs = [];
beforeAll(() => {
  sdd = initCarnetsEntretiensSdd();
  marquesFs = ['Alfa Romeo', 'Audi', 'Bmw', 'Chevrolet', 'Chrysler', 'Citroën', 'Dacia', 'Daewoo', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lancia', 'Mazda', 'Mercedes-Benz', 'Mini', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Rover', 'Seat', 'Skoda', 'Smart', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'];
  modelesFs = externalExec.execSync(`find "${pathData}" -type f | awk -F/ '{print $NF}'`).toString();
  marquesFs.forEach(marque => {
    modelesParMarquesFs.push(externalExec.execSync(`find "${pathData}" -type f | grep "${marque}" | awk -F/ '{print $NF}'`).toString())
  })
});

describe("Obtenir des informations depuis la SDD", () => {
  test("Obtenir la liste des marques", () => {
    expect(getInfos.getAllMarquesTab(sdd)).toEqual(marquesFs);
  });

  test("Otenir la liste de tous les modèles", () => {
    let modelesInSddTab = getInfos.getAllModelsTab(sdd);
    let modelesInSddString = "";
    for (modelesTab of modelesInSddTab) {
      for (modele of modelesTab) {
        modelesInSddString += modele + "\n";
      }
    }
    expect(modelesInSddString).toEqual(modelesFs);
  });

  test("Obtenir la liste des modèles d'une marque donnée", () => {
    let modelesFromMarquesInSdd = [];
    let buffer = "";
    marquesFs.forEach(marque => {
      getInfos.getModelsFromMarqueTab(sdd, marque).forEach(model => {
        buffer += model + "\n";
      })
      modelesFromMarquesInSdd.push(buffer);
      buffer = "";
    });

    expect(modelesFromMarquesInSdd).toEqual(modelesParMarquesFs);
  });

  test("Obtenir toutes les motorisations", () => {
    // bon il faut rajouter d'autre motor ... pas assez la mais pas le temps !
    let aTester = ["Adam 1.4 87cv", "19 1.7 73cv", "Grand Vitara 2.0 HDI 110 16V 4x4 109cv", "Koleos 2 2.0 dCi 175 4WD 177cv", "Kalos 1.4 83cv", "Swift 2 1.3 68cv", "Crossland X 1.2 110cv", "Karoq 1.5 TSI 150cv", "Giulietta 2.0 JTDM 175cv", "C5 3 Tourer 2.7 HDi 204cv"]

    for(tester of aTester) {
      expect(getInfos.getAllMotorsTab(sdd)).toContain(tester);
    }
  });

  test("Obtenir toutes les motorisations d'une marques donnée", () => {
  });

  test("Obtenir toutes les motorisations d'un modele donnée d'une marque donnée", () => { });
  test("Obtenir toutes l'ensemble des révisions (km et time) d'une marque, model, motor", () => { 
    expect(getInfos.getRevisions(sdd, "Volvo", "xc90 1.json", "XC90 T6 AWD 272cv")).toHaveProperty("km");
    expect(getInfos.getRevisions(sdd, "Volkswagen", "beetle.json", "(VW) Beetle 2.0 TSI 211cv")).toHaveProperty("km");
    expect(getInfos.getRevisions(sdd, "Alfa Romeo", "147.json", "147 1.6 16V T.SPARK 120cv")).toHaveProperty("km");
    
    expect(getInfos.getRevisions(sdd, "lol", "mdr.json", "ptdr")).toEqual({});
  });
});