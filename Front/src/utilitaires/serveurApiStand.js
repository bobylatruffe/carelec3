import { checkStatusApi } from "./serveurApi"

function fetchRevisions({ marque, modele, motorisation }) {
  return fetch(`http://localhost:5000/api/carnetsEntretiens/${marque}/${modele}/${motorisation}?what=km`)
    .then(response => checkStatusApi(response.status, response.json()))
}

function tryToStand(immat) {
  return fetch(`http://localhost:5000/api/toStandardiser/${immat}`)
    .then(response => checkStatusApi(response.status, response.json()))
}

export { tryToStand, fetchRevisions }