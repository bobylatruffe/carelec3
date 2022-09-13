export async function checkStatusApi(status, resultJson) {
  const result = await resultJson;
  if (status !== 200) {
    return Promise.reject(result);
  }

  return result;
}

export function getUserInfos(userId) {
  return fetch(`http://localhost:5000/api/user/${userId}`)
  .then(response => checkStatusApi(response.status, response.json()))
}

export function addClient(userInfos) {
  return fetch("http://localhost:5000/api/user/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfos, null, 2)
  }).then(response => checkStatusApi(response.status, response.json()))
}

export function fetchAvis() {
  return fetch("http://localhost:5000/api/avis")
    .then(response => checkStatusApi(response.status, response.json()))
    .then(avis => avis)
}