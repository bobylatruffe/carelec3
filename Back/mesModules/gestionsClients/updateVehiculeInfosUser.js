const fs = require("fs");
const clError = require("../utilitaires/error")
const path = require("path");

function updateVehiculeInfosUser(id, userInfos) {
  userInfos = JSON.stringify(userInfos, null , 2);
  try {
    fs.writeFileSync(path.join(__dirname, "../../data/clients/", id, id+".json"), userInfos);
  } catch (err) {
    clError("updateVehiculeInfosUser()", "Impossible de mettre à jours vehiculeInfos de l'user", err.message);
  }
}

module.exports = updateVehiculeInfosUser;