const toStandardiser = require("../../mesModules/standardisation/standardisation");
const { getLibelle } = require("../../mesModules/getLibelle/getLibelle");
const { getCarnetsEntretiensSdd } = require("../../mesModules/carnetsEntretiens/initCarnetsEntretiensSdd")

const express = require("express");
const router = express.Router();

router.get("/:numImmat", (req, resp) => {
  getLibelle(req.params.numImmat)
    .then(data => {
      return resp.json(toStandardiser(getCarnetsEntretiensSdd(), data))
    })
    .catch(err => {
      return resp.status(500).json({
        message: "Impossible de standardiser avec cette plaque"
      })
    })
});

router.get("/*", (_, resp) => {
  return resp.status(500).json({ message: "Merci de fournir une plaque d'immat" });
});

module.exports = router;