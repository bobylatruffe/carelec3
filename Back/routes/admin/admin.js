/**
 * Nom ...................... : admin.js
 * Rôle ..................... : 
 
Les routes définies ici seront utilisées par le garagiste afin de mettre à jour les informations d'une révision en cours. Ces informations seront ensuite utilisées pour être affichées dans le compte de l'utilisateur afin de lui permettre de suivre en live l'avancement de l'entretien de son véhicule.

 * Autheur .................. : Bozlak Fatih 1503001522G
 * Licence .................. : IED L2 Informatique
 * Année .................... : 2021/2022
 * Usage .................... : 

 **/

const getUserInfos = require("../../mesModules/gestionsClients/getUserInfos");
const getCurrentRevision = require("../../mesModules/gestionsClients/getCurrentRevision")
const addRevisionProgToHistory = require("../../mesModules/gestionsClients/addRevisionProgToHistory");

const express = require("express");
const setCurrentRevisionFait = require("../../mesModules/gestionsClients/setCurrentRevisionFait");
const router = express.Router();


/*   
  Cette route permet (à l'admin) de confirmer qu'une révision en cours (révisonProg.json dans le dossier de l'user) est terminée et qu'elle doit être ajoutée à l'historique des révisions du client (dans le fichier revisions.json).
  
  Si l'user, sa révision en cours existe, alors c'est le module addRevisionProgToHistory qui est appelé.
*/
router.get("/:userId/addRevisionProgToHistory", (req, resp) => {
  // en vrai ces vérifications sont déjà faites dans le module de la fonction addRevisionProgToHistory ... la preuve que je commence à me perdre !!!
  // après j'aurai prévoir de lever une exception partuclier pour chaque type d'erreur afin de fournir un message cohérent ici en capturant !

  if (!getUserInfos(req.params.userId))
    return resp.status(500).json({ message: "Utilisateur non trouvée" });

  if (!getCurrentRevision(req.params.userId))
    return resp.status(500).json({ message: "Impossible de trouver une révision programmé" });

  if (addRevisionProgToHistory(req.params.userId))
    return resp.json({ message: "Révision ajouté à l'historique du client" });

  return resp.status(500).json({ message: "Problème lors de l'ajout dans l'historique du client" });
});



/*
  Ce point de terminaison permet de mettre à jours dans la révision courante de l'user, les états des lieux.

  Un état des lieux est représenté par son type (dropUp | pickUp), de coordonnées x et y (qui indique où il y'a des défauts sur la voiture cf-fontend), et d'un commentaire précisant le type de défaut.
*/
router.post("/:userId/currentRevisionEdl", (req, resp) => {
  if (!getUserInfos(req.params.userId))
    return resp.status(500).json({ message: "Utilisateur non trouvée" });

  if (!getCurrentRevision(req.params.userId))
    return resp.status(500).json({ message: "Impossible de trouver une révision programmé" });

  if (setCurrentRevisionEdl(req.params.userId, req.body.type, req.body.newValue))
    return resp.json({ message: "Mise à jour des 'etatDesLieux'" })

  return resp.status(500).json({ message: "Impossible de mette à jours les 'etatsDesLieux'" });
});




/*
  Cette route permet de mettre à jour la révision courante de l'utilisateur userId. Cette MAJ s'occupe (et cette route) s'occupe particulièrement de la partie 'fait'.

  La partie 'fait' fait référence aux pièces, tâches que le garagiste a effectuées ou en cours. Il est possible de fournit des images des pièces changées.

  Les images sont d'abord traitées avec le interlogiciel multer pour être stocké dans un dossier temporaire (/Back/data/imgsTmp), pour ensuite être déplacé (fs.rename) dans le dossier imgs de l'utilisateur.

  Je découvre littéralement le monde des requêtes HTTP (puisque le cours de Réseau je n'ai pas pu le commencer véritablement cette année). Ce code, et notamment tous le code dans se projet son 'moche', mais honnêtement je n'arrive pas donner plus, je suis tellement stressé concernant le délai ...

  J'ai mis la déclaration de ces variables ici, et non au début, car j'essaye au max (sans forcément respecter tout le temps) de déclarer des variables seulement quand je vais les utiliser.
*/
const multer = require("multer");
const upload = multer({ dest: __dirname + "../../../data/imgsTmp/" });

const fs = require("fs");
const path = require("path");
const setCurrentRevisionEdl = require("../../mesModules/gestionsClients/setCurrentRevisionEdl");

router.post("/:userId/currentRevisionFait", upload.array('img', 10), (req, resp) => {
  if (!req.body.objFait)
    return resp.status(500).json({ message: "Aucun objFait n'a été fournit" });

  if (!getUserInfos(req.params.userId))
    return resp.status(500).json({ message: "Utilisateur non trouvée" });

  if (!getCurrentRevision(req.params.userId))
    return resp.status(500).json({ message: "Impossible de trouver une révision programmé" });

  let objFait = JSON.parse(req.body.objFait);

  if (req.files.length > 0) {
    let newPathImg = path.join(__dirname, "../../data/clients", req.params.userId, "imgs", objFait.intitule);

    for (file of req.files) {
      let newPathImgFile = newPathImg + "-" + Date.now() + "-" + file.filename + ".png";
      fs.renameSync(file.path, newPathImgFile); // je sais c'es pas de l'asynchrone mais il me reste 4 jours ...
      objFait.imgs.push(newPathImgFile);
    }
  }

  if (setCurrentRevisionFait(req.params.userId, objFait))
    return resp.json({ message: "Mise à jour des 'fait'" })

  return resp.status(500).json({ message: "Impossible de mette à jours les 'fait'" });
});



/*
  POUR SIMULATION !
  Va permetre de définir les coordonées GPS jusqu'à l'arrivé chez le client.
*/
const { getAddrToCoord, getPolyline } = require("../../mesModules/utilitaires/gps");
const polylineEncoded = require("polyline-encoded");
let simulationGaragisteCoordsTab = [];

router.get("/gps/:start/:arrival", async (req, resp) => {
  /*
    Je viens d'apprendre cette nouvelle syntaxe afin pour les promises (await);
    Vraiment 1000 fois plus ergonomique de utilisée then()
  */

  let startCoord = null;
  let arrivalCoord = null;

  let polyline = null;

  if (req.query.polyline !== "true") {
    simulationGaragisteCoordsTab = [];
    startCoord = await getAddrToCoord(req.params.start);
    arrivalCoord = await getAddrToCoord(req.params.arrival);

    polyline = await getPolyline(startCoord, arrivalCoord);

    simulationGaragisteCoordsTab = polylineEncoded.decode(polyline);

    return resp.json({ simulationGaragisteCoordsTab, polyline, });
    
  } else {
    if (simulationGaragisteCoordsTab.length === 0)
      return resp.status(500).json({ message: "Plus de coordonnées dispo" })

    startCoord = simulationGaragisteCoordsTab.shift();
    arrivalCoord = await getAddrToCoord(req.params.arrival);

    polyline = await getPolyline(startCoord, arrivalCoord);
    polyline = polylineEncoded.decode(polyline);

    return resp.json({
      garagisteCoords: startCoord,
      polylineCoords: polyline,
    })
  }
});

/*
  POUR SIMULATION !
  Va simuler l'obtention des coordonées GPS du garagiste à chaque appel.
*/
router.get("/gps", (req, resp) => {
  if (simulationGaragisteCoordsTab.length === 0)
    return resp.status(500).json({ message: "Plus de coordonnées dispo" })

  return resp.json(simulationGaragisteCoordsTab.shift());
});

module.exports = router;

