import { useLocation } from "react-router-dom";

import "./MaVoiture.css"

export default function MaVoiture() {
  const location = useLocation();
  const { immat, km, libelleStandardise } = location.state

  return (
    <div className="mavoiture-container">
      <div className="mavoiture-container-infos">
        <p className="label">Marque :</p>
        <p className="value">{libelleStandardise.marque}</p>
      </div>
      <div className="mavoiture-container-infos">
        <p className="label">Modèle :</p>
        <p className="value">{
          libelleStandardise.modele.charAt(0).toUpperCase() +
          libelleStandardise.modele.slice(1, -5)
        }</p>
      </div>
      <div className="mavoiture-container-infos">
        <p className="label">Motorisation :</p>
        <p className="value">{libelleStandardise.motorisation}</p>
      </div>
      <div className="mavoiture-container-infos">
        <p className="label">Dernier kilométrage :</p><p className="value">{km} km</p>
      </div>
      <div className="mavoiture-container-infos">
        <p className="label">Immatriculation :</p>
        <p className="value">{immat}</p>
      </div>
    </div>
  )
}