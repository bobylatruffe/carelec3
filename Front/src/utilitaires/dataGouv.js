function postaleToLatLng(adressePostale) {
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=${adressePostale}&limit=1`)
    .then(resp => resp.json())
    .then(resp => {
      return [
        resp.features[0].geometry.coordinates[1],
        resp.features[0].geometry.coordinates[0],
      ]
    });
}

export { postaleToLatLng }