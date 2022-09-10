import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu/Menu";
import Accueil from "./components/Accueil/Accueil";
import Footer from "./components/Footer/Footer";
import NotreGarage from "./components/NotreGarage/NotreGarage";

import "./App.css";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="notregarage" element={<NotreGarage />} />
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;