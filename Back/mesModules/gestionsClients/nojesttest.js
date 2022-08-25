const addClient = require("./addClient");
const initRevision = require("./initRevision");
const getCurrentRevision = require("./getCurrentRevision");

let id = addClient({
  nom: "bozlak",
  prenom: "fatih",
  dateOfBirth: "05081992",
  addrPost: "16 rue de macon",
  ville: "Strasbourg",
  email: "bozlak.fatih@gmail.com",
  portable: "0636679200",
  vehicule: {
    immat: "AANNNAA",
    km: 15000,
    libelleStandardise: {
      marque: "audi",
      modele: "a1",
      motorisation: "a1 1.5 ..."
    }
  },
  revisionProgramme: null,
  lastRevision: null,
})

initRevision({
  id: "148552793",
  dateRevision: "dateDeInterventation",
  vehiculeInfos: {
    "immat": "AANNNAAA",
    "km": 15000,
    "libelleStandardise": {
      "marque": "audi",
      "modele": "a1.json",
      "motorisation": "a1 1.5 hDi"
    },
  },
  revisionsAFaire: ["filtre à air", "bougie"]
})

console.log(getCurrentRevision(148552793));

// const addRevisionProgToHistory = require("./addRevisionProgToHistory");
// addRevisionProgToHistory(148552793);