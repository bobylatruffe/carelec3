/**
 * Nom ...................... : standardisation.js
 * Rôle ..................... : 
 
Ce module permet de standardisé un libelle de véhicule (obtenu par notre api d'identification de plaque) seulement si les éléments cotenu dans le libellé correspondent aux données dans notre sdd (bdd) de véhicule.

Ce module, et notamment la partie getMotorisation n'est pas très jolie, je pense même inefficase, mais je n'ai pas eu le choix, d'une part à cause du temps, mais d'une autre part très importante c'est que le libellé obtenu par l'API, ne sont pas de la même forme, et ne correspondent pas à la structure de mes données sur les véhicules issues d'une autre source.

De ce fait, ce module permet d'obtenir un certain pourcentage de positif, mais aucunement 100% de standardisation.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 
 
const toStandardisation = require("./standardisation.js")
toStandardiser("CITROËN BERLINGO 2.0 HDI 90 (90Ch)");
    valeur retournée si standardisé =>
      {
        marque: 'Toyota',
        modele: 'yaris.json',
        motorisation: 'Yaris 1.5 Hybrid 75cv',
        cv: '75'
      }
    valeur retournée si pas standardisé
      null
 **/


const { getModelsFromMarqueTab, getAllMotorsFromMarqueModelTab } = require('../carnetsEntretiens/infosCarnetsEntretiensSdd');

function setCv({ traiter, enCours }) {
  let cv = enCours.slice(-1)[0];
  if (cv[0] === '(' && cv.slice(-1) === ')')
    if (cv.includes("cv") || cv.includes("ch")) {
      traiter.cv = cv.slice(1, -3);
      enCours.pop();
      return true;
    }

  console.error("Error: setCv(): Impossible d'identifier le nombre de cv de " + enCours)
  return null;
}

function setMarque({ traiter, enCours }) {
  let marquePotentiel = enCours[0];

  switch (marquePotentiel) {
    case "alfa":
      traiter.marque = "Alfa Romeo";
      enCours.shift();
      enCours.shift();
      return true;

    case "mini":
      traiter.marque = "Mini";
      enCours.shift();
      enCours.shift();
      return true;

    case "mercedes-benz":
      traiter.marque = "Mercedes-Benz";
      enCours.shift();
      return true;

    default:
      marquePotentiel = marquePotentiel.charAt(0).toUpperCase() + marquePotentiel.slice(1);
      traiter.marque = marquePotentiel;
      enCours.shift();
      return true;
  }
}

function setSuppInitules(structLibelle) {
  let regex = new RegExp(/\(([^\)]+)\)/g);

  let enCoursStr = structLibelle.enCours.join(" ");
  enCoursStr = enCoursStr.replaceAll(regex, '');

  structLibelle.enCours = enCoursStr.split(" ").filter(elem => {
    if (elem != '')
      return elem;
  })

  return true;
}

function setRomainToDecimal(structLibelle) {
  structLibelle.enCours = structLibelle.enCours.map(elem => {
    switch (elem) {
      case "i":
        return "1";
      case "ii":
        return "2";
      case "iii":
        return "3";
      case "iv":
        return "4";
      case "v":
        return "5";
      case "vi":
        return "6";
      case "vii":
        return "7";
      case "viii":
        return "8";
      case "ix":
        return "9";
      default:
        return elem;
    }
  })
}

function setModele(sdd, structLibelle) {
  let potentielModel = structLibelle.enCours.join(" ");

  // tenter d'accorder les data pour BMW 
  if (structLibelle.traiter.marque === "Bmw")
    potentielModel = "serie " + potentielModel;

  let modelsInSddFromMarque = getModelsFromMarqueTab(sdd, structLibelle.traiter.marque).map(elem => {
    return elem.toLowerCase().split(".")[0]; // supp le .json
  });

  // va contenir les modèles potentiels
  let modelsMatchTab = modelsInSddFromMarque.filter(modelInSdd => potentielModel.includes(modelInSdd));

  if (modelsMatchTab.length === 0) {
    console.error("Error: setModele(): Impossible d'identifier le modèle dans la SDD pour " + structLibelle.traiter.marque + " " + structLibelle.enCours.toString())

    return null;
  }

  // on place le modèle potentiel qui correspond le plus à l'index 0
  modelsMatchTab = modelsMatchTab.sort((a, b) => b.length - a.length);

  structLibelle.traiter.modele = modelsMatchTab.map(elem => elem + ".json");
  return true;
}

function setMotorisation(sdd, structLibelle) {
  let allMotorsForModelInSddTab = getAllMotorsFromMarqueModelTab(
    sdd,
    structLibelle.traiter.marque,
    structLibelle.traiter.modele[0] // si j'ai le temps je traiterai les autres cas possible, sinon je prend le 1er élément.
  );

  // on filtre avec le mm nb de chevaux
  let motorisationsPotentielTab = allMotorsForModelInSddTab.filter(motorInSdd => {
    // juste pour isoler le nb de cheveux
    // str -> tab dernier elem -> str -> supp cv|ch
    let cvInSdd = motorInSdd.split(" ").slice(-1)[0].slice(0, -2);
    return (structLibelle.traiter.cv === cvInSdd)
  });

  // pour proposer la meilleur motorisation possible 
  function getNbMatch(chaine1, tab2) {
    let score = 0;
    let chaine1Tab = chaine1.toLowerCase().split(" ");

    for (tab2Chunk of tab2) {
      for (tab1Chunk of chaine1Tab) {
        if (tab2Chunk === tab1Chunk)
          score++;
      }
    }

    return {
      score,
      motor: chaine1,
    }
  }

  if (motorisationsPotentielTab.length === 0) {
    console.error(`Error: setMotorisation(): Aucune motorisation trouvée dans sdd pour ${structLibelle.traiter.marque} ${structLibelle.enCours.toString()}`)
    return null;
  }

  let bestMotorsTab = [];
  for (motorPotentiel of motorisationsPotentielTab) {
    bestMotorsTab.push(getNbMatch(motorPotentiel, structLibelle.enCours));
  }

  bestMotorsTab = bestMotorsTab.sort((a, b) => b.score - a.score);

  // on garde tous ce qui on le même scrore le plus elevée 
  let bestScore = bestMotorsTab[0].score;
  bestMotorsTab = bestMotorsTab.filter(bestMotor => {
    return bestMotor.score === bestScore
  })

  // on va garder celui qui à la meilleur correspondance avec le moins d'élément (lenght)
  let motorisationIdentifie = bestMotorsTab[0].motor;
  let bestMotorLength = bestMotorsTab[0].motor.length;

  for (bestMotor of bestMotorsTab) {
    if (bestMotor.motor.length < bestMotorLength)
      motorisationIdentifie = bestMotor.motor;
  }

  structLibelle.traiter.modele = structLibelle.traiter.modele[0]; // voir 1er remarque au début
  structLibelle.traiter.motorisation = motorisationIdentifie;

  return structLibelle;
}

function toStandardiser(sdd, libelle) {
  if (!libelle) {
    console.error("Error: toStandardiser() : aucun libellé n'est fournit.");
    return null;
  }

  // Cette structure (objet) permet d'isoler les différents éléments d'un libellé :
  // cv, modele, marque, motorisation.
  // traiter contiet ce qu'on à standardisé,
  // enCours contient ce qu'il reste à traiter
  let structLibelle = {
    traiter: {
      marque: null,
      modele: [],
      motorisation: "",
      cv: null,
    },
    enCours: libelle.toLowerCase().split(" "),
  }

  if (!setCv(structLibelle))
    return null;

  setMarque(structLibelle);
  setSuppInitules(structLibelle);
  setRomainToDecimal(structLibelle);
  if (!setModele(sdd, structLibelle))
    return null;

  if (!setMotorisation(sdd, structLibelle))
    return null;

  return structLibelle.traiter;
}

module.exports = toStandardiser;

// toStandardiser("MINI MINI (R50, R53) 1.4 One D (88Ch)");
// toStandardiser("MINI MINI lolmdr dfjs (110ch)");
// toStandardiser("FIAT FREEMONT (JC_, JF_ ) 2.0 JTD (140Ch)");
// toStandardiser("MERCEDES-BENZ CLASSE C coupe T-Model (S205) 3.0 C 400 4-matic 4x4 (205.266) (333Cv)");
// toStandardiser("CITROËN BERLINGO 2.0 HDI 90 (90Ch)");
// toStandardiser("CITROËN BERLINGO Camionnette 1.9 D 70 (69Ch)");
// toStandardiser("RENAULT TRAFIC Autobus/Autocar 1.9 dCI 100 (101Ch)");
// toStandardiser("ALFA ROMEO 156 1.6 16V T.SPARK (120cv)")
// toStandardiser("ALFA ROMEO 156 1.6 16V T.SPARK (12)")
// toStandardiser("MERCEDES-BENZ CLASSE A A trois volumes (W177) 1.5 A 180 d (177.103) (116Ch)");
// toStandardiser("RENAULT CLIO V (BF_) 1.0 TCe 100 (B7MT) (101Ch)");
// toStandardiser("RENAULT TRAFIC Autobus/Autocar 1.9 dCI 100 (101Ch)");
// toStandardiser("RENAULT KANGOO Express (FW0/1_) 1.5 dCi 75 (75Cv)")
// toStandardiser("VOLKSWAGEN SCIROCCO (137, 138) 2.0 TDI (140Ch)")
// toStandardiser("VOLKSWAGEN GOLF VII (5G1, BE1) 1.6 TDI (110Cv)");