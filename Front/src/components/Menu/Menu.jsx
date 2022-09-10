import { NavLink } from "react-router-dom";

import "./Menu.css";

function Menu() {
  return (
    <div className="Menu-main">
      <nav className="Menu-content">
        <NavLink to="/" className="Menu-logo"></NavLink>
        <NavLink to="/notregarage" className="Menu-link">Notre garage</NavLink>
        <NavLink to="/ccm" className="Menu-link">Comment ça marche ?</NavLink>
        <NavLink to="/estimer" className="Menu-link">Estimer un entretien</NavLink>
        <NavLink to="/aides" className="Menu-link">Aides</NavLink>
        <NavLink to="/contact" className="Menu-link">Contact</NavLink>
        <NavLink to="/moncompte" className="Menu-compte"></NavLink>
      </nav>
    </div >
  )
}

export default Menu;