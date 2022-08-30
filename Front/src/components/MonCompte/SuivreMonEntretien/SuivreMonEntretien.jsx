import { useLocation } from "react-router-dom"
import ResumerCurrentRevision from "./ResumerCurrentRevision/ResumerCurrentRevision";
import Geoloc from "./Geoloc/Geoloc";
import Fait from "./Fait/Fait";
import EtatDesLieux from "../../EtatDesLieux/EtatDesLieux";

import "./SuivreMonEntretien.css"

export default function SuivreMonEntretien() {
  const location = useLocation();
  return (
    <div className="suivreMonEntretien">
      <ResumerCurrentRevision userId={location.state.userId} />
      <Geoloc userId={location.state.userId} map={"map1"}/>
      <EtatDesLieux userId={location.state.userId} admin={true} type="pickUp" />
      <Fait userId={location.state.userId} />
      <Geoloc userId={location.state.userId} map={"map2"} classNamePerso={"Geoloc2"}/>
      <EtatDesLieux userId={location.state.userId} admin={false} type="dropUp" classNamePerso="etatDesLieux2" />
    </div>
  )
}