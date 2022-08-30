import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Connexion from "./components/Connexion/Connexion";
import MonCompte from "./components/MonCompte/MonCompte";
import MesInfos from "./components/MonCompte/MesInfos/MesInfos"
import Historique from "./components/MonCompte/Historique/Historique";
import MaVoiture from "./components/MonCompte/MaVoiture/MaVoiture";
import SuivreMonEntretien from "./components/MonCompte/SuivreMonEntretien/SuivreMonEntretien";
import StandardiserVehicule from './components/StandardiserVehicule/StandardiserVehicule';
import ShowRevision from "./components/StandardiserVehicule/ShowRevision/ShowRevision";
import PrendreRdv from "./components/PrendreRdv/PrendreRdv"
import Menu from "./components/Menu/Menu";
import SignUp from "./components/MonCompte/SignUp/SignUp";

function App() {
  return (
    <div className="main-for-menu">
      <Menu />
      <div className="main">

        <Routes>
          <Route path="/" element={<StandardiserVehicule />} />
          <Route path="propositionRevision" element={<ShowRevision />} />
          <Route path="prendrerdv" element={<PrendreRdv />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="moncompte" element={<MonCompte />}>
            <Route path="mesinfos" element={<MesInfos />} />
            <Route path="mavoiture" element={<MaVoiture />} />
            <Route path="suivremonentretien" element={<SuivreMonEntretien />} />
            <Route path="historique" element={<Historique />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
