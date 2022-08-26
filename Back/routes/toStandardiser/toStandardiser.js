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
    .catch(err => { return resp.status(500).json({}) })
});

router.get("/*", (_, resp) => {
  return resp.status(404).json({});
});

module.exports = router;