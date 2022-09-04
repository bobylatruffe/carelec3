import { Route, Routes } from "react-router-dom";

import "./App.css";

import Menu from "./components/Menu/Menu";
import MonCompte from "./components/MonCompte/MonCompte";
import MesInformations from "./components/MonCompte/MesInformations/MesInformations";
import SuivreMonEntretien from "./components/MonCompte/SuivreMonEntretien/SuivreMonEntretien";
import MonHistorique from "./components/MonCompte/MonHistorique/MonHistorique";
import Connexion from "./components/Connexion/Connexion";

function App() {
  return (
    <div className="main-container">
      <Menu />
      <Routes>
        <Route path="/connexion" element={<Connexion />}></Route>
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