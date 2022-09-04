import { Route, Routes } from "react-router-dom";

import "./App.css";

import Menu from "./components/Menu/Menu";
import MonCompte from "./components/MonCompte/MonCompte";
import MesInformations from "./components/MonCompte/MesInformations/MesInformations";
import SuivreMonEntretien from "./components/MonCompte/SuivreMonEntretien/SuivreMonEntretien";
import MonHistorique from "./components/MonCompte/MonHistorique/MonHistorique";
import Connexion from "./components/Connexion/Connexion";
import SignUp from "./components/Connexion/SignUp/SignUp";
import Standardise from "./components/Standardise/Standardise";
import ShowRevisions from "./components/Standardise/ShowRevisions/ShowRevisions";

function App() {
  return (
    <div className="main-container">
      <Menu />
      <Routes>
        <Route path="/" element={<Standardise />} />
        <Route path="/showrevisions" element={<ShowRevisions />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/moncompte" element={<MonCompte />}>
          <Route path="mesinformations" element={<MesInformations />} />
          <Route path="suivremonentretien" element={<SuivreMonEntretien />}></Route>
          <Route path="monhistorique" element={<MonHistorique />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;