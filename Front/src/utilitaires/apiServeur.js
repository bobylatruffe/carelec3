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

export { getCurrentResumer, getCurrentResumerSimple };