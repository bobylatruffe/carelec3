/*
  Mettre à jour l'état des lieux d'une révision courante.
*/
function setCurrentRevisionEdl(id, type, croixRouges) {
  let toJsonSend = {
    type,
    newValue: {
      realiserLe: new Date().toLocaleString("fr-FR").replace(/\/:/g, ''),
      croixRouges: [croixRouges]
    }
  }

  return fetch(`http://localhost:5000/api/admin/${id}/currentRevisionEdl`, {
    method: "POST",
    body: JSON.stringify(toJsonSend),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(resp => {
      if (resp.status === 500) {
        return Promise.reject("Erreur: setCurrentRevisionEdl()");
      }

      return resp.json();
    })
}

/* 
  Retourne simplement la ppt etatDesLieux  de la révision courante de l'user id.
*/
function getCurrentResumerEdl(id) {
  return getCurrentResumer(id)
    .then(currentRevision => {
      currentRevision = currentRevision[Object.keys(currentRevision)[0]];
      return currentRevision.etatDesLieux;
    })
    .catch(err => console.log("Erreur: getCurrentResumerEdl()"));
}

/*
  Retourne une version simplifier de la révision courante de l'user id.
*/
function getCurrentResumerSimple(id) {
  return getCurrentResumer(id)
    .then(currentRevision => {
      currentRevision = currentRevision[Object.keys(currentRevision)[0]];
      return {
        motorisation: currentRevision.vehiculeInfos.libelleStandardise.motorisation,
        km: currentRevision.vehiculeInfos.km,
        aFaire: currentRevision.aFaire
      }
    })
    .catch(err => console.log("Erreur: getCurrentResumerSimple()"));
}

/*
  Retourne le json correspondant à la révision courante de l'user id.
*/
function getCurrentResumer(id) {
  return fetch(`http://localhost:5000/api/user/${id}/currentRevision`)
    .then(data => {
      if (data.status === 500)
        return Promise.reject("Erreur: getCurrentResumer()");

      return data.json();
    })
}

export { getCurrentResumer, getCurrentResumerSimple, getCurrentResumerEdl, setCurrentRevisionEdl };