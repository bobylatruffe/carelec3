import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchCurrentRevision } from "../../../utilitaires/serveurApi";

import ResumerEntretien from "./ResumerEntretien/ResumerEntretien";
import Geoloc from "./Geoloc/Geoloc";
import EtatDesLieux from "./EtatDesLieux/EtatDesLieux";
import Fais from "./Fais/Fais";

function getHtmlErreur() {
  return (
    <p>Vous n'avez de révision programmée</p>
  )
}

function getHtmlSuivre(userId, currentRevision) {
  const dateEntretien = Object.keys(currentRevision)[0];
  currentRevision = currentRevision[dateEntretien];
  return (
    <div>
      <h2>Entretien prévu le {dateEntretien}</h2>
      <ResumerEntretien
        vehiculeInfos={currentRevision.vehiculeInfos}
        aFaire={currentRevision.aFaire}
      />

      <Geoloc userId={userId} type="pickUp" map="map1" />
      {/* <Geoloc userId={userId} type="dropUp" map="map2" /> */}
      <EtatDesLieux userId={userId} admin="" type="dropUp" />

      <Fais userId={userId} />
    </div>
  )
}

function SuivreMonEntretien() {
  const location = useLocation();

  const [returnRender, setReturnRender] = useState(null);
  const [userId, setUserId] = useState(location.state?.userId);

  useEffect(() => {
    if (userId) {
      fetchCurrentRevision(userId)
        .then(currentRevision => setReturnRender(getHtmlSuivre(userId, currentRevision)))
        .catch(err => {
          console.log(err.message);
          setReturnRender(getHtmlErreur());
        })
    }
  }, [userId]);

  return (
    <div>
      <h1>Suivre mon entretien</h1>
      {returnRender}
    </div>
  )
}

export default SuivreMonEntretien;