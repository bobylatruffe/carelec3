/**
 * Nom ...................... : user.js
 * Rôle ..................... : 
 
Les routes définies ici seront utilisées par l'utilisateur, enfin pas directement (sauf s'il décide d'appeler l'API directement depuis le navigateur, je suis même persuadé qu'il existe un moyen d'empêcher que les routes s'exécutent si les requêtes arrivent directement ... j'essayerai de voir cela à la fin, car il me reste encore 1000 trucs à faire et il reste 5 jours !)

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

 **/

const getUserInfos = require("../../mesModules/gestionsClients/getUserInfos");
const getCurrentRevision = require("../../mesModules/gestionsClients/getCurrentRevision")
const initRevision = require("../../mesModules/gestionsClients/initRevision");
const addClient = require("../../mesModules/gestionsClients/addClient");

const express = require("express");
const router = express.Router();

// il faut protéger cette api par un captcha !!!
// je sais pas encore s'il le faut pour le front ou ici ...
router.post("/addUser", (req, resp) => {
  // ici faut également vérifier le contenu de l'objet req.body ...
  let addClientId = addClient(req.body);
  if (addClientId)
    return resp.json({ id: addClientId });

  return resp.status(500).json({message: "Impossible d'ajouter un utilisateur"})
})

router.post("/:userId/initRevision", (req, resp) => {
  if (!getUserInfos(req.params.userId))
    return resp.status(500).json({ message: "Utilisateur non trouvée" });


  if (getCurrentRevision(req.params.userId))
    return resp.status(500).json({ message: "Déjà une révision programmé" });

  if (initRevision(req.params.userId, req.body))
    return resp.json({ message: "Revision programmé" });

  return resp.status(500).json({ message: "Impossible d'initialiser la révision" })
})

router.get("/:userId/currentRevision", (req, resp) => {
  if (!getUserInfos(req.params.userId))
    return resp.status(500).json({ message: "Utilisateur non trouvée" });

  let currentRevision = getCurrentRevision(req.params.userId)
  if (currentRevision)
    return resp.json(currentRevision);

  return resp.status(500).json({ message: "Impossible de trouver une révision programmé" });
});

module.exports = router;