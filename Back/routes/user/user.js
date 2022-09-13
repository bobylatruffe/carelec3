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
const updateVehiculeInfosUser = require("../../mesModules/gestionsClients/updateVehiculeInfosUser");
const getAllRevisons = require("../../mesModules/gestionsClients/getAllRevisions");

const express = require("express");
const router = express.Router();
const path = require("path");

// il faut protéger cette api par un captcha !!!
// je sais pas encore s'il le faut pour le front ou ici ...
router.post("/addUser", (req, resp) => {
  // ici faut également vérifier le contenu de l'objet req.body ...
  let addClientId = addClient(req.body);
  if (addClientId)
    return resp.json({ userId: `${addClientId}` });

  return resp.status(500).json({ message: "Impossible d'ajouter un utilisateur" })
})

router.post("/:userId/initRevision", (req, resp) => {
  if (!req.body.dateRevision || !req.body.vehiculeInfos || !req.body.revisionsAFaire)
    return resp.status(500).json({ message: "Aucune donnée fournit" });

  const userInfos = getUserInfos(req.params.userId)
  if (!userInfos)
    return resp.status(500).json({ message: "Utilisateur non trouvée" });


  if (getCurrentRevision(req.params.userId))
    return resp.status(500).json({ message: "Déjà une révision programmé" });

  console.log(userInfos)
  userInfos.vehiculeInfos = req.body.vehiculeInfos;
  console.log(userInfos);
  updateVehiculeInfosUser(req.params.userId, userInfos);

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

router.get("/:userId/imgs/:img", (req, resp) => {
  const pathImg = path.join(__dirname, "../../data/clients", req.params.userId, "imgs", req.params.img);

  resp.sendFile(pathImg);
});

router.get("/:userId", (req, resp) => {
  const userInfos = getUserInfos(req.params.userId);

  if (!userInfos)
    return resp.status(500).json({ message: "utilisateur non trouvée" });

  return resp.json(userInfos);
});

router.get("/:userId/all", (req, resp) => {
  const userInfos = getUserInfos(req.params.userId);

  if (!userInfos) {
    return resp.status(500).json({ message: "utilisateur non trouvée" });
  }
  const allRevisions = getAllRevisons(req.params.userId);
  if (allRevisions)
    return resp.json(JSON.parse(allRevisions));

  return resp.json({ message: "Aucun historique trouvée" })
});

const hash = require("../../mesModules/utilitaires/hash");
router.post("/connexion", (req, resp) => {
  const tmpUserId = hash(`${req.body.portable}${req.body.email}`);
  if(!getUserInfos(tmpUserId)) {
    return resp.status(500).json({message: "Impossible de se connecter avec les identifiants fournis"})
  }

  return resp.json({userId: `${tmpUserId}`})
});

module.exports = router;