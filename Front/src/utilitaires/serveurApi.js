async function checkStatusApi(status, resultJson) {
  const result = await resultJson;
  if (status !== 200) {
    return Promise.reject(result);
  }

  return result;
}

function fetchRevisionsHistory(userId) {
  return fetch(`http://localhost:5000/api/user/${userId}/all`)
    .then(result => checkStatusApi(result.status, result.json()))
    .then(allRevision => allRevision)
    .catch(err => console.log(err.message));
}

function fetchCurrentRevisionFais(userId) {
  return fetchCurrentRevision(userId)
    .then(currentRevision => {
      currentRevision = currentRevision[Object.keys(currentRevision)[0]];
      return currentRevision.fait;
    });
}

/*
  Mettre à jour l'état des lieux d'une révision courante.
*/
function setCurrentRevisionEdl(id, type, croixRouges) {
  let toJsonSend = {
    type,
    newValue: {
      realiserLe: new Date().toLocaleString("fr-FR"),
      // realiserLe: new Date().toLocaleString("fr-FR").replace(/\/:/g, ''),
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
function fetchCurrentRevisionEdl(id) {
  return fetchCurrentRevision(id)
    .then(currentRevision => {
      currentRevision = currentRevision[Object.keys(currentRevision)[0]];
      return currentRevision.etatDesLieux;
    })
    .catch(err => console.log("Erreur: getCurrentResumerEdl()"));
}

// /*
//   Retourne le json correspondant à la révision courante de l'user id.
// */
// function fetchCurrentRevision(userId) {
//   return fetch(`http://localhost:5000/api/user/${userId}/currentRevision`)
//     .then(result => checkStatusApi(result.status, result.json()));
// }

async function fetchGaragisteToUserPolyline(userAdressePostale) {
  return fetch(`http://localhost:5000/api/admin/gps/rien/${userAdressePostale}?polyline=true`)
    .then(resp => checkStatusApi(resp.status, resp.json()))
}

// Initialiser la simulation du GPS du garagiste.
// Côté serveur on initialise un tableau de coordonnées GPS,
// c'est juste pour la simulation, en vrai il faudrait trouver le moyen de get les coordonées, 
// depuis le tel du garagiste, hors j'ai essayer à de multiple reprise, sans passer par une application, 
// sur Android pas possible. Pour un moyen c'était d'utiliser le navigateur, hors il été question de requête https vs http, et mon serveur n'est pas codé pour ça ... d'ou l'utilisé de la simulation.
// on pose que le départ du garagiste c'est toujours à l'adresse indiqué en 1er position ..api/Admin/gps/ICI/userAdressePostale
async function initGpsSimulateurGaragiste(userAdressePostale) {
  const garagisteAdresse = "30 RUE DE LYON 67640";

  let result = await fetch(`http://localhost:5000/api/admin/gps/${garagisteAdresse}/${userAdressePostale}`);

  return await result.json();
}

// Permet de savoir si le garagiste est en cours d'aller chercher le véhicule du client user id
function fetchGaragisteArrive(type, userId) {
  return fetchCurrentRevision(userId)
    .then(currentRevision => {
      currentRevision = currentRevision[Object.keys(currentRevision)[0]];
      if (type === "pickUp")
        return currentRevision.goPickUp;

      return currentRevision.goDropUp;
    })
}

// Permet de récupérer l'adresse d'un client
function fetchUserAdresse(userId) {
  return fetchUserInfos(userId)
    .then(userInfos => `${userInfos.addrPost} ${userInfos.cp} ${userInfos.ville}`)
}

// Permet de récupérer, si elle existe la révision cournte d'un user 
function fetchCurrentRevision(userId) {
  if (!userId) {
    console.log("Error: fetchUserInfos() -> pas d'userId");
    return null;
  }

  return fetch(`http://localhost:5000/api/user/${userId}/currentRevision`)
    .then(result => checkStatusApi(result.status, result.json()))
}

/* 
  Retourne NULL si pas d'userID (normalement presque impossible)
  Retourne une promise : 
    - resolve => information de l'user ;
    - reject => message d'erreur du serveur ;
*/
function fetchUserInfos(userId) {
  if (!userId) {
    console.log("Error: fetchUserInfos() -> pas d'userId");
    return null;
  }

  return fetch("http://localhost:5000/api/user/" + userId)
    .then(result => {
      return checkStatusApi(result.status, result.json())
    })
}

export { fetchUserInfos, fetchCurrentRevision, fetchUserAdresse, fetchGaragisteArrive, initGpsSimulateurGaragiste, fetchGaragisteToUserPolyline, setCurrentRevisionEdl, fetchCurrentRevisionEdl, fetchCurrentRevisionFais, fetchRevisionsHistory }