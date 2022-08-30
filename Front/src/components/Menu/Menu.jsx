import { Link } from "react-router-dom";

import "./Menu.css";
import logo from "./logo.png";

export default function Menu() {
  return (
    <div className="menu">
      <img src={logo} alt="logo" />
      <div className="menu-center">
        <Link to="/" className="menu-item">Accueil</Link>
        <Link to="/connexion" className="menu-item">Mon compte</Link>
      </div>
    </div>
  )
}