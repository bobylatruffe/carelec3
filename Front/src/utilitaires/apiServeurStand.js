// Récupérer toute les révisions d'une motorisation
function getRevision(marque, model, motor) {
  model = model.slice(0, -5);
  return fetch(`http://localhost:5000/api/carnetsEntretiens/${marque}/${model}/${motor}?what=km`)
    .then(revision => {
      if (revision.status === 500)
        return Promise.reject(null)

      return revision.json()
    })
    .catch(err => null);
}

// Récupérer toute les motorisations d'un modèle d'une marque de véhicule
function getMotors(marque, model) {
  return fetch(`http://localhost:5000/api/carnetsEntretiens/${marque}/${model}`)
    .then(motorsTab => {
      if (motorsTab.status === 500)
        return Promise.reject(null)

      return motorsTab.json()
    })
    .catch(err => null);
}

// Récupérer tous les modèles d'une marque donnée
function getModels(marque) {
  return fetch(`http://localhost:5000/api/carnetsEntretiens/${marque}`)
    .then(marquesTab => marquesTab.json())
}

// Récupérer toutes les marques dispo dans le seveur 
function getMarques() {
  return fetch("http://localhost:5000/api/carnetsEntretiens/marques")
    .then(marquesTab => marquesTab.json())
}

// Récupérer, si possible la standardisation d'un véhicule par sa plaque d'immat
function getStandImmat(immat) {
  return fetch(`http://localhost:5000/api/toStandardiser/${immat}`)
    .then(resp => {
      if (resp.status === 500)
        return Promise.reject("Impossible de standardiser à partir de cet plaque d'immat");

      return resp.json();
    })
    .catch(err => {
      console.log(err);
      return null;
    })
}

export { getStandImmat, getMarques, getModels, getMotors, getRevision}