const { getLibelleTest } = require("./getLibelle.js");

// immat valide et invalide
const IMMATS = ["FC134LL", "AV573FF", "CX484NS", "AY262RL", "CL644BL", "OK549EK", "KB486VL"];

describe("Récupérer le libellé d'une plaque d'immat", () => {
  test("Tester que la requête retourne un objet (valide ou invalide)", () => {
    for (immat of IMMATS)
      return getLibelleTest(immat).then(result => {
        expect(result).toHaveProperty("numberPlate");
      })
  });

  test("Vérifier qu'un libelle est présent", () => {
    for (immat of IMMATS) {
      return getLibelleTest(immat).then(result => {
        if (result.vehicule.length > 0)
          expect(result.vehicule[0]).toHaveProperty("libelle");
      })
    }
  });
});