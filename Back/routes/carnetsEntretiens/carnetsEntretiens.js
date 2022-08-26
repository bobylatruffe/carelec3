const express = require("express");
const router = express.Router();

const { getCarnetsEntretiensSdd } = require("../../mesModules/carnetsEntretiens/initCarnetsEntretiensSdd")
const carnetsEntretiensSdd = getCarnetsEntretiensSdd();

const { getAllMarquesTab, getModelsFromMarqueTab, getAllMotorsFromMarqueModelTab, getRevisions } = require("../../mesModules/carnetsEntretiens/infosCarnetsEntretiensSdd");

router.get("/marques", (_, resp) => {
  let allMarques = getAllMarquesTab(carnetsEntretiensSdd);

  if (allMarques.length != 0) {
    return resp.status(200).json(allMarques);
  }

  return resp.status(500).send("Impossible de récupérer les marques");
});

router.get("/:marque", (req, resp) => {
  let marqueFromReq = req.params.marque;

  let allModelsFromMarque = getModelsFromMarqueTab(carnetsEntretiensSdd, marqueFromReq);
  if (allModelsFromMarque.length != 0)
    return resp.json(allModelsFromMarque)

  return resp.status(500).send("La marque fournit ne correspond à rien");
});

router.get("/:marque/:modele/", (req, resp) => {
  let marqueFromReq = req.params.marque;
  let modeleFromReq = req.params.modele + ".json";

  let allMotorsFromMarqueModelTab = getAllMotorsFromMarqueModelTab(carnetsEntretiensSdd, marqueFromReq, modeleFromReq);
  if (allMotorsFromMarqueModelTab.length != 0)
    return resp.json(allMotorsFromMarqueModelTab)

  return resp.status(500).send("Le modèle fournit n'est pas correct");
});

router.get("/:marque/:modele/:motor", (req, resp) => {
  let forReqSdd = {
    marque: req.params.marque,
    model: req.params.modele + ".json",
    motor: req.params.motor,
  }

  if (req.query.what && (req.query.what !== "km" && req.query.what !== "time"))
    return resp.status(500).send("Impossible de récupérer les révisions, pb query what");

  let revisions = getRevisions(carnetsEntretiensSdd, forReqSdd)
  if (revisions !== {}) {
    if (req.query.what === "km")
      return resp.json(revisions.km)
    if (req.query.what === "time")
      return resp.json(revisions.time)
    return resp.json(revisions);
  }

  return resp.status(500).send("Impossible de récupérer les révisions");
});


module.exports = router;