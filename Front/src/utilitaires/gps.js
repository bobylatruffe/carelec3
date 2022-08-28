/* 
  Permet d'obtenir le polyline entre deux coordonnées GPS.
*/
function getPolyline(coord1, coord2) {
  const coords = `${coord1[0]},${coord1[1]};${coord2[0]},${coord2[1]}`;
  return fetch(`http://router.project-osrm.org/route/v1/car/${coords}`)
    .then(resp => resp.json())
    .then(resp=> resp.routes[0].geometry);
}

/*
  Retourne (enfin dans une promesse...) les coordonnées GPS (lon, lat) d'une adresse postale.
  
  param: 
    adresse : doit obligatoirement conteni soit le CP ou la ville ou les deux, 
              sinon gros pb !
*/
function getAddrToCoord(adresse) {
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}&limit=1`)
    .then(resp => resp.json())
    .then(resp => resp.features[0].geometry.coordinates);
}

module.exports = {getAddrToCoord, getPolyline}