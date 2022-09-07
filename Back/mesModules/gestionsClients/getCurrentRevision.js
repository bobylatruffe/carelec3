const { clError, path, fs, pathClients } = require("../utilitaires/includes")

function getCurrentRevision(id) {
  let currentRevision = null;
  id = id.toString();

  try {
    currentRevision = fs.readFileSync(path.join(pathClients, id, "revisionProg.json"));
  } catch (err) {
    clError("getCurrentRevision()", `Impossible de trouver la courante révision de ${id}`, err.message);
    return null;
  }

  return JSON.parse(currentRevision);
}

module.exports = getCurrentRevision;

// const addClient = require("./addClient");
// const initRevision = require("./initRevision");

// initRevision({
//   id: 148552793,
//   dateRevision: new Date().toLocaleString('fr-FR'),
//   vehiculeInfos: {
//     "immat": "AANNNAAA",
//     "km": 15000,
//     "libelleStandardise": {
//       "marque": "audi",
//       "modele": "a1.json",
//       "motorisation": "a1 1.5 hDi"
//     },
//   },
//   revisionsAFaire: ["filtre à air", "bougie"]
// })

// console.log(getCurrentRevision(148552793))