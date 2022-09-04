/* 
  Permet d'obtenir le polyline entre deux coordonnées GPS.
*/
function getPolyline(coord1, coord2) {
  const coords = `${coord1[1]},${coord1[0]};${coord2[1]},${coord2[0]}`;
  return fetch(`http://router.project-osrm.org/route/v1/car/${coords}`)
    .then(resp => resp.json())
    .then(resp => resp.routes[0].geometry);
}

/*
  Retourne (enfin dans une promesse...) les coordonnées GPS (lat, lng) d'une adresse postale.
  
  param: 
    adresse : doit obligatoirement contenir soit le CP et/ou la ville ou les deux, 
              sinon gros pb !
*/
function getAddrToCoord(adresse) {
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}&limit=1`)
    .then(result => result.json())
    .then(coords => {
      return [
        coords.features[0].geometry.coordinates[1],
        coords.features[0].geometry.coordinates[0],
      ]
    })
}

module.exports = { getAddrToCoord, getPolyline }