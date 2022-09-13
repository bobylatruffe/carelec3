import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu/Menu";
import Accueil from "./components/Accueil/Accueil";
import Footer from "./components/Footer/Footer";
import NotreGarage from "./components/NotreGarage/NotreGarage";
import Connexion from "./components/Connexion/Connexion";
import SignUp from "./components/SignUp/SignUp";
import MonCompte from "./components/MonCompte/MonCompte";

import "./App.css";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="notregarage" element={<NotreGarage />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="moncompte" element={<MonCompte />} />
        </Routes>
        <Footer />
      </div>

    </Fragment>
  );
}

export default App;