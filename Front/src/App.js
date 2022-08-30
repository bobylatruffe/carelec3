import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import ResumerCurrentRevision from "./components/ResumerCurrentRevision/ResumerCurrentRevision";
import EtatDesLieux from "./components/EtatDesLieux/EtatDesLieux";
import Fait from "./components/Fait/Fait";
import Geoloc from "./components/Geoloc/Geoloc";
import StandardiserVehicule from "./components/StandardiserVehicule/StandardiserVehicule";
import ShowRevision from "./components/ShowRevision/ShowRevision";
import Connexion from "./components/Connexion/Connexion";
import PrendreRdv from "./components/PrendreRdv/PrendreRdv";
import Merci from "./components/Merci/Merci";
import MonCompte from "./components/MonCompte/MonCompte";

function App() {
  return (
    <Fragment>
      <h1>Carelec</h1>
      {/* <ResumerCurrentRevision />
      <EtatDesLieux type="pickUp" admin={true} />
      <Fait />
      <Geoloc /> */}
      <Routes>
        <Route exact path="/" element={<StandardiserVehicule />} />
        <Route path="/propositionRevision" element={<ShowRevision />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/prendrerdv" element={<PrendreRdv />} />
        <Route path="/merci" element={<Merci />} />
        <Route path="/moncompte" element={<MonCompte />} />
      </Routes>

    </Fragment>
  );
}

export default App;
