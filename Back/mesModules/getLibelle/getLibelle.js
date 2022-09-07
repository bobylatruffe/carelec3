const fetch = require('node-fetch');

function getLibelleTest(immat) {
  if (!immat) {
    console.error("Error: getLibelle(): Merci de fournir une immatriculation");
    return Promise.reject("null");
  }

  return fetch("https://www.mister-auto.com/nwsAjax/Plate?captcha_token=&family_id=0&generic_id=0&category_id=0&locale=fr_FR&device=desktop&pageType=homepage&country=FR&lang=fr&captchaVersion=v3&plate_selector_vof=&immatriculation=" + immat)
    .then(data => data.json());
}

function getLibelle(immat) {
  if (!immat) {
    console.error("Error: getLibelle(): Merci de fournir une immatriculation");
    return Promise.reject("null");
  }

  return fetch("https://www.mister-auto.com/nwsAjax/Plate?captcha_token=&family_id=0&generic_id=0&category_id=0&locale=fr_FR&device=desktop&pageType=homepage&country=FR&lang=fr&captchaVersion=v3&plate_selector_vof=&immatriculation=" + immat)
    .then(data => data.json())
    .then(dataJson => {
      if (dataJson.vehicule.length > 0)
        return dataJson.vehicule[0].libelle

      return {};
    })
}



module.exports = { getLibelleTest, getLibelle };