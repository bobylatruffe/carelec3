import { NavLink } from "react-router-dom";

import "./Menu.css";

function Menu() {
  let userId = sessionStorage.getItem("userId");

  return (
    <div className="Menu-main">
      <nav className="Menu-content">
        <NavLink to="/" className="Menu-logo"></NavLink>
        <NavLink to="/notregarage" className="Menu-link">Notre garage</NavLink>
        <NavLink to="/ccm" className="Menu-link">Comment ça marche ?</NavLink>
        <NavLink to="/estimer" className="Menu-link">Estimer un entretien</NavLink>
        <NavLink to="/aides" className="Menu-link">Aides</NavLink>
        <NavLink to="/contact" className="Menu-link">Contact</NavLink>
        {
          userId ?
            <NavLink to="/moncompte" className="Menu-compte"></NavLink>
            :
            <NavLink to="/connexion" className="Menu-compte"></NavLink>
        }

      </nav>
    </div >
  )
}

export default Menu;